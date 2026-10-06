$ErrorActionPreference = 'Stop'
# An isolated console is essential: broadcasting Ctrl+C in the test runner's
# console would interrupt unrelated tests. No shell parses the child argv.
Add-Type @'
using System;
using System.Text;
using System.Runtime.InteropServices;
public static class StatsConsoleTest {
  [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Unicode)]
  public struct StartupInfo {
    public int cb; public string reserved; public string desktop; public string title;
    public int x, y, width, height, charsX, charsY, fill, flags;
    public short show, reservedSize; public IntPtr reservedBytes, input, output, error;
  }
  [StructLayout(LayoutKind.Sequential)]
  public struct ProcessInfo { public IntPtr process, thread; public uint pid, tid; }
  [DllImport("kernel32.dll", CharSet=CharSet.Unicode, SetLastError=true)]
  public static extern bool CreateProcessW(string app, StringBuilder command, IntPtr processAttributes, IntPtr threadAttributes, bool inheritHandles, uint flags, IntPtr environment, string cwd, ref StartupInfo startup, out ProcessInfo process);
  [DllImport("kernel32.dll", SetLastError=true)] public static extern bool FreeConsole();
  [DllImport("kernel32.dll", SetLastError=true)] public static extern bool AttachConsole(uint pid);
  [DllImport("kernel32.dll", SetLastError=true)] public static extern bool SetConsoleCtrlHandler(IntPtr handler, bool add);
  [DllImport("kernel32.dll", SetLastError=true)] public static extern bool GenerateConsoleCtrlEvent(uint control, uint group);
  [DllImport("kernel32.dll")] public static extern uint WaitForSingleObject(IntPtr handle, uint milliseconds);
  [DllImport("kernel32.dll")] public static extern bool GetExitCodeProcess(IntPtr handle, out uint code);
  [DllImport("kernel32.dll")] public static extern bool TerminateProcess(IntPtr handle, uint code);
  [DllImport("kernel32.dll")] public static extern bool CloseHandle(IntPtr handle);
}
'@
$startup = New-Object StatsConsoleTest+StartupInfo
$startup.cb = [Runtime.InteropServices.Marshal]::SizeOf($startup)
$child = New-Object StatsConsoleTest+ProcessInfo
$command = [Text.StringBuilder]::new($env.OMP_RUNNER_TEST_COMMAND)
if (-not [StatsConsoleTest]::CreateProcessW($env.OMP_RUNNER_TEST_BUN, $command, [IntPtr]::Zero, [IntPtr]::Zero, $false, 0x10, [IntPtr]::Zero, $env.OMP_RUNNER_TEST_CWD, [ref]$startup, [ref]$child)) {
  throw "CreateProcess failed: $([Runtime.InteropServices.Marshal]::GetLastWin32Error())"
}
try {
  $deadline = [DateTime]::UtcNow.AddSeconds(20)
  while (-not (Test-Path -LiteralPath $env.OMP_RUNNER_TEST_READY_FILE)) {
    if ([DateTime]::UtcNow -gt $deadline) { throw 'Stats did not become ready' }
    Start-Sleep -Milliseconds 50
  }
  [StatsConsoleTest]::FreeConsole() | Out-Null
  if (-not [StatsConsoleTest]::AttachConsole($child.pid)) { throw 'AttachConsole failed' }
  # Set only after CreateProcess: the child must not inherit an ignored Ctrl+C.
  if (-not [StatsConsoleTest]::SetConsoleCtrlHandler([IntPtr]::Zero, $true)) { throw 'SetConsoleCtrlHandler failed' }
  if (-not [StatsConsoleTest]::GenerateConsoleCtrlEvent(0, 0)) { throw 'GenerateConsoleCtrlEvent failed' }
  if ([StatsConsoleTest]::WaitForSingleObject($child.process, 10000) -ne 0) { throw 'Ctrl+C did not stop the launcher' }
  $code = [uint32]0
  if (-not [StatsConsoleTest]::GetExitCodeProcess($child.process, [ref]$code)) { throw 'GetExitCodeProcess failed' }
  if ($code -ne 0) { throw "Official handled Ctrl+C should retain zero, received $code" }
} finally {
  if ([StatsConsoleTest]::WaitForSingleObject($child.process, 0) -ne 0) { [StatsConsoleTest]::TerminateProcess($child.process, 1) | Out-Null }
  [StatsConsoleTest]::CloseHandle($child.thread) | Out-Null
  [StatsConsoleTest]::CloseHandle($child.process) | Out-Null
}

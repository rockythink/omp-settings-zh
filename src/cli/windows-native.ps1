param([Parameter(Mandatory = $true)][string]$Source)
$ErrorActionPreference = 'Stop'
# Framework CodeDom (PowerShell 5 Add-Type -TypeDefinition) starts csc with an
# ANSI environment block. Unicode TEMP/TMP become invalid paths on an English
# Windows code page. Invoke the same compiler directly, preserving the Unicode
# environment, then load bytes so the DLL does not lock its temporary directory.
$compilation = Join-Path ([IO.Path]::GetTempPath()) ('omp-native-' + [Guid]::NewGuid().ToString('N'))
[IO.Directory]::CreateDirectory($compilation) | Out-Null
try {
  $sourcePath = Join-Path $compilation 'native.cs'
  $assemblyPath = Join-Path $compilation 'native.dll'
  [IO.File]::WriteAllText($sourcePath, $Source, [Text.UTF8Encoding]::new($true))
  $compiler = Join-Path ([Runtime.InteropServices.RuntimeEnvironment]::GetRuntimeDirectory()) 'csc.exe'
  $compilerOutput = & $compiler /nologo /target:library "/out:$assemblyPath" $sourcePath 2>&1
  if ($LASTEXITCODE -ne 0) { throw "Native type compiler exited $LASTEXITCODE`: $compilerOutput" }
  [Reflection.Assembly]::Load([IO.File]::ReadAllBytes($assemblyPath)) | Out-Null
} finally {
  Remove-Item -LiteralPath $compilation -Recurse -Force
}

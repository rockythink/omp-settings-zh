import type { HostMetadata } from "../../src/compatibility";

export function createFakeHost(): HostMetadata {
  return {
    version: "18.4.4",
    platform: process.platform,
    schema: {
      autoResume: {
        type: "boolean",
        default: false,
        ui: {
          tab: "interaction",
          group: "Startup & Updates",
          label: "Auto Resume",
          description: "Automatically resume the most recent session in the current directory",
        },
      },
      "power.sleepPrevention": {
        type: "enum",
        default: "idle",
        values: ["off", "idle", "display", "system"],
        ui: {
          tab: "interaction",
          group: "Power (macOS)",
          label: "Sleep Prevention",
          description:
            "Prevent macOS sleep during active sessions. Each level is cumulative — it adds the flags of all lower levels.",
          options: [
            { value: "off", label: "Off", description: "Do not prevent any sleep" },
            {
              value: "idle",
              label: "Prevent Idle Sleep",
              description: "Keep the system awake while a session is open (caffeinate -i)",
            },
            {
              value: "display",
              label: "Prevent Display Sleep",
              description: "Also keep the display from idle-sleeping (caffeinate -i -d)",
            },
            {
              value: "system",
              label: "Prevent System Sleep",
              description:
                "Also block all system sleep on AC and declare the user active (caffeinate -i -d -s -u)",
            },
          ],
        },
      },
      unlistedSetting: {
        type: "boolean",
        default: true,
        ui: {
          tab: "interaction",
          label: "Upstream Addition",
          description: "An untranslated upstream setting",
        },
      },
    },
  };
}

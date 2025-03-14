/**
 * This script helps fix the EMFILE: too many open files error
 * by reducing the number of watched files and optimizing the development environment.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Function to reduce the number of watched files
function reduceWatchedFiles() {
  console.log(
    "Applying aggressive fixes for EMFILE: too many open files error...",
  );

  // Create a more comprehensive .watchmanconfig file with proper ignore patterns
  const watchmanConfig = {
    ignore_dirs: [
      ".git",
      "node_modules",
      ".expo",
      ".next",
      "dist",
      "web-build",
      "app/tempobook",
      "tempobook",
      "assets",
      ".github",
      "__tests__",
      "coverage",
      "android",
      "ios",
    ],
    root_files: true,
    fsevents_latency: 0.05, // Reduce fsevents latency for macOS
    settle: 5000, // Wait longer for filesystem to settle
  };

  fs.writeFileSync(
    path.join(process.cwd(), ".watchmanconfig"),
    JSON.stringify(watchmanConfig, null, 2),
    "utf8",
  );
  console.log("Updated .watchmanconfig with comprehensive ignore patterns");

  // Try to increase file descriptor limit for the current process
  try {
    if (process.platform === "linux" || process.platform === "darwin") {
      console.log(
        "Attempting to increase file descriptor limit for current process...",
      );
      // This will only work if the user has sufficient permissions
      execSync("ulimit -n 10240", { stdio: "inherit" });
    }
  } catch (error) {
    console.log("Could not increase file descriptor limit programmatically.");
  }

  // Create a .expo/settings.json file with optimized settings
  const expoSettingsDir = path.join(process.cwd(), ".expo");
  if (!fs.existsSync(expoSettingsDir)) {
    fs.mkdirSync(expoSettingsDir, { recursive: true });
  }

  const expoSettings = {
    hostType: "lan",
    lanType: "ip",
    dev: true,
    minify: false,
    https: false,
    devClient: false,
    scheme: null,
    packagerOpts: {
      maxWorkers: 2, // Reduce number of workers
      resetCache: true,
    },
  };

  fs.writeFileSync(
    path.join(expoSettingsDir, "settings.json"),
    JSON.stringify(expoSettings, null, 2),
    "utf8",
  );
  console.log("Created optimized .expo/settings.json");

  console.log(
    "\nTo permanently fix this issue, you may need to increase your system file watch limits:",
  );
  console.log("\nFor Linux:");
  console.log(
    "  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p",
  );
  console.log("\nFor macOS:");
  console.log(
    "  echo kern.maxfiles=65536 | sudo tee -a /etc/sysctl.conf && sudo sysctl -w kern.maxfiles=65536",
  );
  console.log(
    "  echo kern.maxfilesperproc=65536 | sudo tee -a /etc/sysctl.conf && sudo sysctl -w kern.maxfilesperproc=65536",
  );

  console.log(
    "\nRecommended command to start the development server with reduced file watching:",
  );
  console.log("  EXPO_USE_METRO_LITE=1 npx expo start --clear");

  console.log("\nRestart your development server after making these changes.");
}

reduceWatchedFiles();

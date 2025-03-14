/**
 * This script helps debug file watching issues by listing the most watched directories
 * and providing recommendations to optimize file watching.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function debugFileWatching() {
  console.log("Debugging file watching issues...");

  // Check if running in a Docker container
  const isDocker =
    fs.existsSync("/.dockerenv") ||
    (fs.existsSync("/proc/1/cgroup") &&
      fs.readFileSync("/proc/1/cgroup", "utf8").includes("docker"));
  console.log(`Running in Docker: ${isDocker ? "Yes" : "No"}`);

  // Get current file descriptor limit
  try {
    const limit = execSync("ulimit -n").toString().trim();
    console.log(`Current file descriptor limit: ${limit}`);
  } catch (error) {
    console.log("Could not determine file descriptor limit");
  }

  // Count files in key directories
  const dirsToCheck = [
    ".",
    "node_modules",
    ".expo",
    "app",
    "app/tempobook",
    "components",
  ];

  console.log("\nFile counts in key directories:");
  dirsToCheck.forEach((dir) => {
    if (fs.existsSync(dir)) {
      try {
        const fileCount = countFiles(dir);
        console.log(`${dir}: ${fileCount} files`);
      } catch (error) {
        console.log(`${dir}: Error counting files`);
      }
    } else {
      console.log(`${dir}: Directory does not exist`);
    }
  });

  console.log("\nRecommendations:");
  console.log(
    "1. Run the app with reduced file watching: EXPO_USE_METRO_LITE=1 npx expo start --clear",
  );
  console.log("2. Use the fix-watch-limit script: npm run fix-watch-limit");
  console.log(
    "3. Consider using a different file watching mechanism: watchman or chokidar",
  );
  console.log(
    "4. Reduce the number of files in your project by moving unused files to a separate directory",
  );
  console.log(
    "5. If running in Docker, consider mounting only the necessary directories",
  );
}

function countFiles(dir) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (
      entry.name.startsWith(".") &&
      entry.name !== ".expo" &&
      entry.name !== ".watchmanconfig"
    ) {
      continue; // Skip hidden files/directories except .expo
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += countFiles(fullPath);
    } else {
      count++;
    }
  }

  return count;
}

debugFileWatching();

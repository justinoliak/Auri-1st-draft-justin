/**
 * This script helps reset the project by clearing caches and temporary files
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function resetProject() {
  console.log("Resetting project...");

  try {
    // Clear Metro bundler cache
    console.log("Clearing Metro cache...");
    execSync("npx expo start --clear --no-dev --non-interactive", {
      stdio: "inherit",
    });
    process.exit(0);
  } catch (error) {
    console.error("Error resetting project:", error);
    process.exit(1);
  }
}

resetProject();

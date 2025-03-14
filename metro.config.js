// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const fs = require("fs");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add exclusions for tempobook directories to reduce file watching
config.watchFolders = config.watchFolders || [];
config.watchFolders = config.watchFolders.filter(
  (folder) => !folder.includes("tempobook") && !folder.includes("node_modules"),
);

// Define patterns to exclude from file watching
const blockListPatterns = [
  /\/tempobook\//,
  /\.git\//,
  /\.expo\//,
  /\.next\//,
  /\/node_modules\/.*\//,
  /\/assets\/images\//,
  /\/assets\/fonts\//,
  /\.watchmanconfig/,
  /\.gitignore/,
  /package-lock\.json/,
  /yarn\.lock/,
];

// Reduce the number of watched files
config.resolver.blockList = config.resolver.blockList || [];
// Convert to array if it's not already one
if (!Array.isArray(config.resolver.blockList)) {
  config.resolver.blockList = [config.resolver.blockList].filter(Boolean);
}

// Add all patterns to the blockList
blockListPatterns.forEach((pattern) => {
  config.resolver.blockList.push(pattern);
});

// Optimize Metro bundler performance
config.maxWorkers = 2; // Reduce number of workers
config.transformer.assetPlugins = []; // Disable asset plugins to reduce overhead
config.transformer.minifierConfig = {
  compress: false, // Disable compression in development
  mangle: false, // Disable name mangling in development
};

// Reduce file system polling frequency
config.watcher = {
  healthCheck: {
    enabled: false, // Disable health check to reduce file system operations
  },
  watchman: {
    deferStates: ["hg.update"], // Defer watching during certain states
  },
};

// Use polling instead of file system events on Linux (helps in Docker)
if (process.platform === "linux") {
  config.watcher = {
    ...config.watcher,
    useWatchman: false, // Don't use watchman on Linux
    polling: true, // Use polling instead
    pollingInterval: 3000, // Poll every 3 seconds
  };
}

module.exports = config;

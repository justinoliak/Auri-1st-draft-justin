module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Enable path aliases
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            "@components": "./components",
            "@screens": "./screens",
            "@theme": "./theme",
            "@assets": "./assets",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      // Add Tempo plugin conditionally
      ...(process.env.EXPO_PUBLIC_TEMPO
        ? ["tempo-devtools/dist/babel-plugin"]
        : []),
    ],
  };
};

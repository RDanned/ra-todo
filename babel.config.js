module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'], // Your source directory
          alias: {
            "@": "./src", // Alias "@"
          },
        },
      ],
    ],
    /*plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@/': './src',
        },
      },
    ],
  ],*/
  };
};

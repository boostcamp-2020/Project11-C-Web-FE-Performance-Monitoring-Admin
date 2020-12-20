module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: { ie: 11 },
        modules: 'cjs',
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-arrow-functions',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
  ],
};

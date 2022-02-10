module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "71",
        }
      }
    ],
    ['@babel/preset-react', {
      // pragma: 'h',
      // pragmaFrag: 'Fragment',
    }],
  ],
}

const HtmlWebpackPlugin = require('html-webpack-plugin');

const Path = require('path');

module.exports = {
  entry: './src',
  output: {
    filename: 'index.js',
    path: Path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      // 'normalize.css': 'normalize.css/normalize.css',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({

    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env']
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ]
  },
};

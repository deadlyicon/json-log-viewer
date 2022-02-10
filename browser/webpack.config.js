const HtmlWebpackPlugin = require('html-webpack-plugin');

const Path = require('path');

module.exports = {
  entry: './src',
  output: {
    filename: 'index.js',
    path: Path.resolve(__dirname, 'dist'),
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
      }
    ]
  },
};

'use strict';

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  corejs: 3,
                  useBuiltIns: 'usage',
                },
              ],
            ],
          },
        },
      },
    ],
  },
};

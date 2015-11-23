'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  debug: true,
  context: path.join(__dirname, 'lib'),
  entry: './index.js',
  output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js'
  },
  devtool: 'source-map', // or false
  target: 'web',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|lib)/,
        loader: 'babel'
      },
      {
        test: /\.mustache$/,
        exclude: /(node_modules|lib)/,
        loader: 'mustache?noShortcut'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!autoprefixer?browsers=last 2 version!sass?sourceMap')
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new ExtractTextPlugin('bundle.css')
  ],
  externals: {
    // jquery: 'jQuery' // include jQuery from CDN
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
      'hogan.js': 'hogan.js/dist/template-3.0.2.js' // no need for compiler in the browser
    }
  }
};

var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var options = {
  entry: {
      main: './client/electron/main.js'
  },
  target: 'node',
  output: {
      // Absolute output directory
      path: __dirname + '/../dist/electron'
  },
  module: {
    loaders: [
      { test: /\.node$/, loader: 'node-loader' }
    ]
  },
  // devtool: opts.devtool,
  resolve: {
    // extensions: extensions,
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  node: {
    __dirname: false
  },
  plugins: [
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index-electron.html',
      template: './client/electron/index.html',
      chunks: ['app']
    })
  ]
}

options.target = webpackTargetElectronRenderer(options)

module.exports = function(ENV) {
  return options
}
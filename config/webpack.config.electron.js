var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var options = {
  entry: {
      main: './client/electron/main.js'
  },
  output: {
      // Absolute output directory
      path: __dirname + '/../dist/electron'
  },
  // module: {
  //   loaders: loaders
  // },
  // devtool: opts.devtool,
  resolve: {
    // extensions: extensions,
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  node: {
    __dirname: false
  },
  plugins: [
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    // Only emit files when there are no errors
    // new webpack.NoErrorsPlugin(),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    // Dedupe modules in the output
    // new webpack.optimize.DedupePlugin(),
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
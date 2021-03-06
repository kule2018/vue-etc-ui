var utils = require('../utils')
var webpack = require('webpack')
var config = require('../../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('../webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


var entry = config.exampleDev.entry
// add hot-reload related code to entry chunks
Object.keys(entry).forEach(function(name) {
  entry[name] = ['./build/dev-client'].concat(entry[name])
})

module.exports = merge(baseWebpackConfig, {
  entry: entry,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.exampleDev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './example/index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})

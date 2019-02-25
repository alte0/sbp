const merge = require('webpack-merge')
const common = require('./common.webpack.config.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map'
})

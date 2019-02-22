const merge = require('webpack-merge')
const common = require('./common.webpack.config.js')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'script.js',
    chunkFilename: 'vendor.bundle.js'
  },
  devtool: 'source-map'
})

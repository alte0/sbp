const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./common.webpack.config.js')

module.exports = merge(common, {
  entry: {
    script: ['webpack-hot-middleware/client', './src/js/main.js']
  },
  output: { // path ok
    filename: 'js/script.js',
    chunkFilename: 'js/vendor.bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()]
})

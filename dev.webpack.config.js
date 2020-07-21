const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./common.webpack.config.js');

module.exports = merge(common, {
  entry: {
    script: ['./src/js/main.js']
  },
  output: { // path ok
    filename: 'script.js',
    chunkFilename: 'vendor.bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()]
})

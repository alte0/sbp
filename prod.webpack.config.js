const { merge } = require('webpack-merge');
const common = require('./common.webpack.config.js');

module.exports = merge(common, {
  mode: 'none',
  optimization: {
    minimize: true,
    namedModules: false,
    namedChunks: false,
    flagIncludedChunks: true,
    occurrenceOrder: true,
    usedExports: true,
    concatenateModules: true,
    sideEffects: true
  },
  devtool: 'source-map'
})

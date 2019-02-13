const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    script: ['webpack-hot-middleware/client', './src/js/main.js']
  },
  output: {
    filename: 'js/script.js',
    chunkFilename: 'js/vendor.bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    // exclude исключить
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}

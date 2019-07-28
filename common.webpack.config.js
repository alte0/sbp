module.exports = {
  mode: 'development',
  output: { // path ok
    filename: 'script.js',
    chunkFilename: 'vendor.bundle.js'
  },
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
  }
}

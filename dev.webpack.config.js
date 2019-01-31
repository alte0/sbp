module.exports = {
  mode: 'development',
  entry: ['./src/js/main.js'],
  output: {
    filename: 'js/script.js',
    chunkFilename: 'js/vendor.bundle.js'
  },
  devtool: 'eval-source-map',
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

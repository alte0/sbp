module.exports = {
  mode: "production",
  output: {
    filename: "script.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,

        // exclude исключить
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
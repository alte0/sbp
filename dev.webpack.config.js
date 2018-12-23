module.exports = {
  mode: "development",
  entry: ["./src/js/main.js"],
  output: {
    filename: "js/script.js",
  },
  devtool: "eval-source-map",
  devServer: {
    hotOnly: true,
  },
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
  },
};

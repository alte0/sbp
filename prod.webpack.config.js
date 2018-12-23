module.exports = {
  mode: "production",
  output: {
    filename: "script.js"
  },
  devtool: "source-map",
  module: {
    // exclude исключить
    rules: [
        {
            enforce: "pre",
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader",
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
        },
    ],
  }
};

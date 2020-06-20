const path = require('path');

module.exports = {
  mode: 'development',
  watch: true,
  devtool: 'source-map',
  entry: path.join(__dirname, './src/app.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'main.js',
  },

  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

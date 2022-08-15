const Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: 'source-map',
  plugins: [
    new Dotenv({systemvars: true,}),
    ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react']
        }
      }
    ]
  }
};

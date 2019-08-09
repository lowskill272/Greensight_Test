const path = require('path');
//var Inputmask = require('inputmask');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname,'./dist/js'),
    filename: 'bundle.js',
    publicPath:'dist/js'
  },

  devtool: "source-map",

devServer: {
  overlay: true,
},

module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        loader: 'babel-loader',
      },

      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

// plugins: [
//   new ExtractTextPlugin({
//     filename: './css/style.bundle.css'
//   }),
//     ]
};

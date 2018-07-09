const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {filename: 'bundle.js', path: path.resolve(__dirname, 'dist')},
  module: {rules: [{test: /\.(bin|gltf)$/, use: {loader: 'file-loader'}}]},
  devServer:
      {contentBase: path.join(__dirname, 'dist'), compress: true, port: 9000},
  plugins: [new HtmlWebpackPlugin({template: './src/index.html'})]
}
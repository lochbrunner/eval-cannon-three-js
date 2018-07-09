const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {filename: 'bundle.js', path: path.resolve(__dirname, 'dist')},
  module: {
    rules: [
      {
        test: /\.(bin|gltf)$/,
        use: {loader: 'file-loader', options: {name: '[path][name].[ext]'}}
      },
      {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/}
    ]
  },
  devServer:
      {contentBase: path.join(__dirname, 'dist'), compress: true, port: 9000},
  plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],
  performance: {hints: false}
}
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const extractSass = new ExtractTextPlugin(
    {filename: 'style.css', disable: process.env.NODE_ENV === 'development'});

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  target: 'web',
  output: {filename: 'bundle.js', path: path.resolve(__dirname, 'dist')},
  module: {
    rules: [
      {
        test: /\.(bin|gltf)$/,
        use: {loader: 'file-loader', options: {name: '[path][name].[ext]'}}
      },
      {
        test: /\.s?css$/,
        use: extractSass.extract({
          use: [{loader: 'css-loader'}, {loader: 'sass-loader'}],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/},
      {test: /\.png$/, use: 'url-loader?limit=10000'},
      {test: /\.jpg$/, use: 'file-loader'},
      {test: /\.ttf$/, use: 'file-loader'},
      {test: /\.woff2$/, use: 'file-loader'},
      {test: /\.woff$/, use: 'file-loader'},
      {test: /\.eot$/, use: 'file-loader'},
      {test: /\.svg$/, use: 'file-loader'},
      {
        test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/,
        loader: 'imports-loader?jQuery=jquery'
      },
    ]
  },
  devServer:
      {contentBase: path.join(__dirname, 'dist'), compress: true, port: 9000},
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new ExtractTextPlugin({
      filename: 'styles.css',
      // disable: !isProduction
    }),
    extractSass
  ],
  performance: {hints: false}
}
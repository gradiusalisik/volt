'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var stylesLoader = [
  `css-loader?modules&importLoaders=1&localIdentName=[path]_[local]`,
  'stylus-loader'
];

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/app.jsx')
  ],
  resolve: {
    root: [
      path.resolve(__dirname, "src"),
    ],
    extensions: ['', '.js', '.jsx', '.css']
  },
  output: {
    path: path.join(__dirname, '/public/'),
    filename: '[name].js',
    publicPath: '/'
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 100
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.styl$/,
      loader: 'style!css!stylus'
    }]
  }
};

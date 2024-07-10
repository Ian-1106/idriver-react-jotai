const { merge } = require('webpack-merge'),
  webpack = require('webpack'),
  common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    // contentBase: '/dist',
    port: 1001,
    hot: false,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({

    }),
  ],
});
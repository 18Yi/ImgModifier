const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { theme } = require('./package.json');

module.exports = merge(common, {
  output: {
    filename: '[name].[hash].js',
  },
  devtool: 'source-map',
  devServer: {
    port: 8989,
    open: true,
    compress: true,
    index: 'demo.html',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [{
      test: /\.css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?sourceMap&modules'],
      }),
    }, {
      test: /\.css$/,
      include: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?sourceMap'],
      }),
    },
    {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?sourceMap&modules',
          { loader: 'less-loader', options: { modifyVars: theme } },
        ],
      }),
    },
    ],
  },
});
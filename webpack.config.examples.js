const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/examples/index.js'
  },
  output: {
    path: path.join(__dirname, 'examples'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader?modules&importLoaders=true&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/examples/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    })
  ],

  devServer: {
    contentBase: './public',
    hot: true,
    port: 8888,
    host: 'localhost'
  },

  devtool: 'source-map'
};

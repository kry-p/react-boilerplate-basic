const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const outputDirectory = './build';

dotenv.config();

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, outputDirectory),
    publicPath: '/',
    filename: '[id].[chunkhash].js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      minify: false,
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new CopyPlugin({
      patterns: [{ from: 'public/robots.txt', to: 'robots.txt' }],
    }),
  ],
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
};

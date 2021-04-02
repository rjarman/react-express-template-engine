const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Manifest = require('webpack-manifest-plugin');
const publicPath = 'http://localhost:8080/';

const config = [
  {
    name: 'static',
    entry: {
      index: './src/pages/Index.tsx',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist', 'public'),
      publicPath: publicPath,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    stats: {
      warningsFilter: [/critical dependency:/i, /module not found:/i],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(mp4|png|jpg|svg|jpeg|webp|woff2|woff|ttf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[contenthash].[ext]',
                outputPath: '',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.HashedModuleIdsPlugin({
        context: __dirname,
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20,
      }),
      new HtmlWebpackPlugin({
        filename: '../index.html',
        chunks: ['index'],
        template: 'src/site_template.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[contenthash].css',
      }),
      new Manifest(),
    ],
  },
  {
    name: 'server',
    target: 'node',
    node: {
      __dirname: false,
    },
    entry: './src/server.ts',
    output: {
      filename: 'server.bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: publicPath,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    stats: {
      warningsFilter: [/critical dependency:/i, /module not found:/i],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(mp4|png|jpg|svg|jpeg|webp|woff2|woff|ttf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[contenthash].[ext]',
                emitFile: false,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin({
        context: __dirname,
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20,
      }),
      new CopyPlugin({
        patterns: [
          { from: 'src/public/favicon.ico', to: 'public/[name].[ext]' },
        ],
      }),
      new Manifest(),
      new MiniCssExtractPlugin({
        filename: '[contenthash].css',
      }),
    ],
  },
];
module.exports = config;

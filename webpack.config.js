const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Manifest = require('webpack-manifest-plugin');
const publicPath = 'http://localhost:8080/';

const config = [
  {
    name: 'static',
    entry: {
      index: './src/pages/Index/Index.ts',
    },
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'dist', 'public'),
      publicPath: publicPath,
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    stats: {
      warningsFilter: [/critical dependency:/i, /module not found:/i],
    },
    module: {
      rules: [
        {
          test: /\.(ts)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
      new MiniCssExtractPlugin({
        filename: '[name].min.css',
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
    entry: { server: './src/server.ts' },
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
          test: /\.(mp4|png|jpg|svg|jpeg|webp|ico|woff2|woff|ttf)$/,
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
          { from: 'src/public/*.*', to: 'public/[contenthash].[ext]' },
        ],
      }),
      new Manifest(),
    ],
  },
];
module.exports = config;

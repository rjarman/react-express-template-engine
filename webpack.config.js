const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Manifest = require('webpack-manifest-plugin');
const publicPath = 'http://localhost:8080/';

const hashPlugin = new webpack.HashedModuleIdsPlugin({
  context: __dirname,
  hashFunction: 'sha256',
  hashDigest: 'hex',
  hashDigestLength: 20,
});

const fileLoader = {
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
};

const externalScripts = {
  index: './src/pages/Index/Index.ts',
};

const config = [
  {
    name: 'static',
    entry: externalScripts,
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
        fileLoader,
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      hashPlugin,
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
        fileLoader,
      ],
    },
    plugins: [
      hashPlugin,
      new CopyPlugin({
        patterns: [
          { from: 'src/pages/assets/**/*.*', to: 'public/[contenthash].[ext]' },
        ],
      }),
      new Manifest(),
    ],
  },
];
module.exports = config;

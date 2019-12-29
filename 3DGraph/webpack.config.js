const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, './src');
const dirAssets = path.join(__dirname, './src/assets');

const appHtmlTitle = 'graph';
/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    index: path.join(dirApp, 'index')
  },
  resolve: {
    modules: [
      dirNode,
      dirApp,
      dirAssets
    ]
  },
  devServer: {
    compress: true,
    proxy: {
      "/js/": {
        target: "http://localhost:8080/webapp",
        secure: false
      },
      "/images/": {
        target: "http://localhost:8080/webapp",
        secure: false
      },
      "/css/": {
        target: "http://localhost:8080/webapp",
        secure: false
      },
      "/data/": {
        target: "http://localhost:8080/webapp",
        secure: false
      },
      /*"/": {
        target: "http://183.129.170.220:8088",
        pathRewrite: {'^/dlv/': ''},
        changeOrigin: true,
        secure: false
      }*/
    }
  },
  plugins: [
    /*new webpack.ProvidePlugin({
        "$": "jquery",
        "jQuery": "jquery",
        "window.jQuery": "jquery"
    }),*/
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "static/css/[name].[contenthash].css",
      chunkFilename: "static/css/[id].css"
    }),
    new HtmlWebpackPlugin({
      //favicon: './src/assets/images/favicon.ico',
      template: path.join(__dirname, 'index.ejs'),
      title: appHtmlTitle,
      chunks: ['index'],
      filename: "index.html"
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /(node_modules)/,
      options: {
        compact: true
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: IS_DEV
          }
        }
      ]
    }, {
      test: /\.(scss|less)$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: IS_DEV
          }
        }/*, {
          loader: 'sass-loader',
          options: {
            sourceMap: IS_DEV,
            includePaths: [dirAssets]
          }
        }*/, {  
          loader: 'less-loader',
          options: {
            sourceMap: IS_DEV,
            includePaths: [dirAssets],
            javascriptEnabled: true
          }
        }
      ]
    }, {
      test: /\.(jpe?g|png|gif|cur)$/,
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
        publicPath: '../../'
      }
    }/*, {
      test: /\.txt$/,
      use: 'raw-loader'
    }*/]
  }
};
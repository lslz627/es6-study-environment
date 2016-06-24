import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import 'shelljs/global';

import pageEntry from './pageEntrys.js';

import merge from 'merge';

var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    common: ['jquery', 'bootstrap'],
    // index: ['./src/js/index.js']
    // index2: ['./src/js/index2.js']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name]-[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader?outputStyle=expanded')
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1024 * 40,
          name: '[name].[hash:20].[ext]'
        }
      },
      {
        test: /\.(svg|woff2?|eot|ttf|otf)$/,
        loader: 'file-loader',
        query: {
          limit: 1024 * 20,
          name: 'font/[name].[hash:20].[ext]'
        }
      },
      {
        test: /\.tpl/,
        loader: 'html?attrs=img:src'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/index.html',
    //   filename: 'index.html',
    //   chunks: ['common', 'index']
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/index2.html',
    //   filename: 'index2.html',
    //   chunks: ['common', 'index2']
    // })
  ],
  devtool: 'source-map',
  devServer: {
    port: 8080,
    contentBase: './src',
    historyApiFallback: true
  },
  node: {
    fs: 'empty'
  }
};

var entrys = {};
var extractHtmlWebpackPlugin = [];

pageEntry(entrys, extractHtmlWebpackPlugin);

module.exports.entry = merge(module.exports.entry, entrys);
module.exports.plugins = (module.exports.plugins || []).concat(extractHtmlWebpackPlugin);

if (isProduction) {
  rm('-rf', 'dist');
  mkdir('dist');
  cp('-R', 'src/assets', 'dist');

  module.exports.devtool = '';

  module.exports.plugins = (module.exports.plugins || []).concat([
    new ExtractTextPlugin('css/[name].min.css'),
    // new webpack.optimize.CommonsChunkPlugin('common', 'js/common.min.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]);

  module.exports.output.filename = 'js/[name].min-[hash:8].js';
} else {

  // module.exports.output.publicPath = '/src/';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new ExtractTextPlugin('css/[name].css'),
    // new webpack.optimize.CommonsChunkPlugin('common', 'js/common.js'),
    new webpack.HotModuleReplacementPlugin()
  ]);
}

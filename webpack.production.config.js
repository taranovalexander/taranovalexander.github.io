var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/index.js'),
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [
          path.join(__dirname, 'src')
        ],
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css?importLoaders=1!postcss!sass?sourceMap',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: '/node_module/',
        loaders: ['babel?presets[]=react,presets[]=es2015'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file?name=[1].[ext]&regExp=src/(.*)',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss'),
      },
    ]
  },
  vue: {
    loaders: {
      scss: ExtractTextPlugin.extract('style', 'css!sass?importLoaders=1!postcss'),
    }
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new CopyWebpackPlugin([
      {
        context: 'src/assets/models',
        from: '**/*',
        to: 'assets/models'
      },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      THREE: 'three',
    })
  ],
};
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'utilities': path.resolve(__dirname, '../src/utilities'),
      'services': path.resolve(__dirname, '../src/services'),
      'settings': path.resolve(__dirname, '../src/settings'),
      'native': path.resolve(__dirname, '../src/native'),
      'muse-components': 'muse-ui/src',
      'jquery': path.resolve(__dirname, '../node_modules/jquery/dist/jquery.min.js'),
      'echarts': path.resolve(__dirname, '../node_modules/echarts/dist/echarts.js'),
      'tools': path.resolve(__dirname, '../src/tools'),
      'threeparties' : path.resolve(__dirname, '../src/threeparties'),
      'filters' : path.resolve(__dirname, '../src/filters'),
      // 'fonts': path.resolve(__dirname, '../src/assets/fonts'),
    }
  },
  // 增加一个plugins
//  plugins: [
//      new webpack.optimize.CommonsChunkPlugin('common.js'),
//      new webpack.ProvidePlugin({
//          echarts: "echarts"
//      })
//  ],
    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 80000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
//    {
//          test: /muse-ui.src.*?jd$/,
//          loader: 'babel'
//      }, 
//      {
//          test: /\.less$/,
//          loader: 'style-loader!css-loader!less-loader'
//      },
//      {
//          test:  /\.scss$/,
//          loaders: ['style-loader', 'css-loader', 'sass-loader']
//      },
        {
            test: /\.json$/,
            loader: 'json'
        }
    ]
  }
}

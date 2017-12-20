var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
var glob = require('glob');

function toObj(paths) {
  var ret = {};

  paths.forEach(function(_path) {
    ret['js/' + _path.split('/').slice(-2)[0]] = _path;
  });

  return ret;
}

let jsEntryObj = toObj(glob.sync('./client/apps/**/main.js'));
let jsNames = Object.keys(jsEntryObj);

module.exports = {
  devtool: 'cheap-module-eval-source-map', //default
  entry: Object.assign(jsEntryObj, {
    'js/base': path.resolve(__dirname, '../client/common/main.js')
  }),
  output: {
    path: path.join(__dirname, '../dist/local'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        enforce: 'pre', // Check raw before other loaders
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react']
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(['css-loader'])
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/common.js',
      chunks: jsNames
    }),
    new ExtractTextPlugin({
      filename: getPath => getPath('css/[name].css').replace('css/js', 'css'),
      allChunks: true
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    })
  ]
};

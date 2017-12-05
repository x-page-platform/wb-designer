var webpack = require('webpack');
var path = require('path');
var glob = require('glob');

function toObj(paths, vendors = {}) {
  var ret = {};

  paths.forEach(function(_path) {
    ret[_path.split('/').slice(-2)[0]] = _path;
  });

  ret = Object.assign(ret, vendors);

  return ret;
}

let entryObj = toObj(glob.sync('./client/apps/**/main.js'));
let entryNames = Object.keys(entryObj);

module.exports = {
  devtool: 'false', //default
  entry: entryObj,
  output: {
    path: path.join(__dirname, '../dist/build/js'),
    filename: '[name].js',
    publicPath: '/static'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: entryNames
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
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
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        }
      }
    ]
  }
};

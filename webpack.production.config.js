const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const config = require("./webpack.config");
config.plugins.push(new UglifyJsPlugin());
config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      'NODE_ENV': JSON.stringify('production'),
    }
  })
);

module.exports = config;
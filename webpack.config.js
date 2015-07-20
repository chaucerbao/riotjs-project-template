"use strict";

var path = require("path"),
  webpack = require("webpack");

var src = path.join(__dirname, "src"),
  dest = path.join(__dirname, "public");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: ["./src/app/index.js"]
  },
  output: {
    path: path.join(dest, "assets"),
    publicPath: "assets/",
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },
  module: {
    preLoaders: [{
      test: /\.tag$/,
      loader: "riotjs"
    }],
    loaders: [{
      test: /\.js|\.tag$/,
      loader: "babel",
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("style", "css?sourceMap&minimize!postcss!sass?sourceMap&includePaths[]=" + path.resolve(__dirname, "./src/app/style/"))
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style", "css?sourceMap&minimize!postcss")
    }]
  },
  postcss: [require('autoprefixer')],
  plugins: [
    new webpack.ProvidePlugin({
      riot: "riot",
      dispatcher: "riotcontrol"
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new ExtractTextPlugin("[name].css")
  ],
  resolve: {
    root: [path.resolve("src")],
    extensions: ["", ".js", ".tag", ".scss", ".css"]
  },
  devServer: {
    contentBase: dest,
    noInfo: true,
    hot: true,
    inline: true
  }
};

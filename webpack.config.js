var path = require("path"),
  webpack = require("webpack");

var src = path.join(__dirname, "src"),
  dest = path.join(__dirname, "public"),
  test = path.join(__dirname, "test");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: path.join(src, "index.js")
  },

  output: {
    path: path.join(dest, "assets"),
    publicPath: "/assets/",
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },

  module: {
    preLoaders: [{
      loader: "riotjs",
      test: /\.tag$/,
      include: src
    }, {
      loader: "eslint",
      test: /\.tag$|\.js$/,
      include: [src, test]
    }],

    loaders: [{
      loader: "babel",
      test: /\.tag$|\.js$/,
      include: [src, test]
    }, {
      loader: ExtractTextPlugin.extract("style", "css?sourceMap&minimize!postcss"),
      test: /\.css$/
    }]
  },

  postcss: function(webpack) {
    return [
      require("postcss-import")({
        addDependencyTo: webpack,
        path: [path.join(src, "app", "style")]
      }),
      require("postcss-mixins"),
      require("postcss-simple-vars"),
      require("postcss-nested")
    ];
  },

  plugins: [
    new webpack.ProvidePlugin({ riot: "riot" }),
    new ExtractTextPlugin("[name].css")
  ],

  resolve: {
    root: [path.resolve(src)],
    extensions: ["", ".tag", ".js", ".css"]
  },

  devServer: {
    contentBase: dest,
    historyApiFallback: true,
    noInfo: true,
    hot: true,
    inline: true
  }
};

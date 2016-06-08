const config = require("../webpack.config.js"),
  nodeExternals = require("webpack-node-externals");

config.externals = [nodeExternals()];
config.target = "node";

module.exports = config;

var path = require("path"),
  webpackConfig = require("./webpack.config.js");

// Remove `extract-text-webpack-plugin` (https://github.com/webpack/extract-text-webpack-plugin/issues/42)
var loader;
for (var i = 0, len = webpackConfig.module.loaders.length; i < len; i++) {
  loader = webpackConfig.module.loaders[i].loader;

  if (loader.match(/extract-text-webpack-plugin/)) {
    loader = loader.split("!");
    loader.shift();
    loader = loader.join("!");

    webpackConfig.module.loaders[i].loader = loader;
  }
}

module.exports = function(config) {
  config.set({
    frameworks: ["mocha", "chai"],
    files: [
      "test/**/*.spec.js"
    ],
    preprocessors: {
      "test/**/*.spec.js": ["webpack"]
    },
    plugins: [
      "karma-mocha",
      "karma-chai",
      "karma-chrome-launcher",
      "karma-webpack"
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ["progress"],
    autoWatch: false,
    browsers: ["Chrome"],
    singleRun: true
  })
}

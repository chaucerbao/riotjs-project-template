const path = require('path');
const src = path.resolve(__dirname, 'src');
const dest = path.resolve(__dirname, 'public');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  context: src,

  entry: './index.js',

  output: {
    publicPath: '/assets/',
    path: path.join(dest, 'assets'),
    filename: '[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'RiotJS Project Template',
      filename: path.join(dest, 'index.html')
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader' }],
        include: [src]
      },
      {
        test: /\.tag$/,
        use: [{ loader: 'riotjs-loader' }],
        include: [src]
      }
    ]
  }
};

// Development settings
if (process.env.NODE_ENV !== 'production') {
  config.output = Object.assign(config.output, {
    publicPath: '/',
    path: dest
  });

  config.devServer = {
    historyApiFallback: true
  };
}

module.exports = config;

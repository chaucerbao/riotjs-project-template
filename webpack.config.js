const path = require('path')
const src = path.resolve(__dirname, 'src')
const dest = path.resolve(__dirname, 'public')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextWebpackPlugin({
  filename: '[contenthash].css'
})

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
    new webpack.ProvidePlugin({
      riot: 'riot'
    }),
    extractSass,
    new HtmlWebpackPlugin({
      title: 'RiotJS Project Template',
      filename: path.join('..', 'index.html')
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
        use: [{ loader: 'babel-loader' }, { loader: 'riotjs-loader' }],
        include: [src]
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.join(src, 'styles'), src],
                sourceMap: true
              }
            }
          ]
        }),
        include: [src]
      }
    ]
  },

  resolve: {
    extensions: ['.tag', '.js', '.json'],
    modules: [src, 'node_modules']
  }
}

// Development settings
if (process.env.NODE_ENV !== 'production') {
  Object.assign(config, {
    output: {
      path: dest
    },

    devServer: {
      historyApiFallback: true,
      stats: 'errors-only'
    },

    devtool: 'inline-source-map'
  })
}

module.exports = config

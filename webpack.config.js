// Dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Paths
const path = require('path')
const src = path.resolve(__dirname, 'src')
const dest = path.resolve(__dirname, 'dist')

// Build environment
const isProduction = process.env.NODE_ENV === 'production'

// Webpack configuration
const config = {
  entry: path.join(src, 'index.ts'),
  output: {
    filename: 'script.[chunkhash].js',
    chunkFilename: '[chunkhash].js',
    path: path.join(dest, 'assets'),
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.tag$/,
        use: {
          loader: 'riot-tag-loader',
          query: {
            style: 'stylus',
            template: 'pug',
            type: 'typescript',
            parserOptions: {
              style: {
                use: [require('autoprefixer-stylus')()]
              }
            }
          }
        }
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.tag']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join('..', 'index.html')
    })
  ],
  devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map'
}

// Development server
if (!isProduction) {
  Object.assign(config, {
    output: {
      path: dest,
      publicPath: '/'
    },
    devServer: {
      contentBase: dest,
      historyApiFallback: true,
      stats: 'minimal'
    }
  })
}

module.exports = config

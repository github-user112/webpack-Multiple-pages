var path = require('path')
var webpack = require('webpack')

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


//生产环境使用
const extractSass = new ExtractTextPlugin({
  filename: "./css/[name].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    index: './src/js/index.js',
    /*home: './src/js/home.js',*/
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: "",
    filename: './js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: "sass-loader"
            }
          ],
          publicPath: '../',
          /*// 在开发环境使用 style-loader*/
          fallback: "style-loader"
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          /*{
           loader:'url-loader',
           options:{
           limit:10000,
           name: 'img/[name].[ext]'
           }
           },*/
          {
            loader: 'file-loader'
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        /*options: {
         limit: 10000,
         name: 'fonts/[name].[ext]'
         }*/
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ]
  },
  resolve: {
    extensions: [".js", ".scss"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    hot: false,
    port:3333
  },
  performance: {
    hints: false
  },
  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      minify: {
        removeComments: false,
        collapseWhitespace: false,
        removeAttributeQuotes: false
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
  ],
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
     minimize: true
     })
  ])
}

const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const port = process.env.PORT || 3000;
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: prod ? '' : 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: ['node_modules', 'src']
  },
  optimization: {
    minimizer: prod ? [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin()] : []
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/img'),
        to: path.resolve(__dirname, 'dist/img')
      }
    ])
    // ,
    // new StyleLintPlugin({
    //   configFile: path.resolve(__dirname, '.stylelintrc'),
    //   emitErrors: true
    // })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', { modules: false }]]
        }
      }
      // , {
      //   loader: 'eslint-loader',
      //   options: {
      //     emitError: true,
      //     emitWarning: true,
      //     failOnError: true,
      //     failOnWarning: true
      //   }
      // }
    ]
    }, {
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: !prod
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: !prod
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: !prod
        }
      }]
    }, {
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }]
    }]
  },
  devServer: {
    host: '0.0.0.0',
    port,
    contentBase: path.resolve(__dirname, 'src')
  }
};

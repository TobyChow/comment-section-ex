const path = require('path');

/*
  Declares path of files
 */
const PATHS = {
  html: path.resolve(__dirname, 'src', 'index.html'), // where html file is located
  output: path.resolve(__dirname, 'dist'), // where to output files
  js: path.resolve(__dirname, 'src', 'index.js') // where javascript file is located
}

/*
  Plugins
 */
// ----- Extract sass/css files into its own .css file instead of bundled with .js file ----- //
// 
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin("./[name]_bundle.css");

// ----- Creates a seperate index.html file in dist that has script tag linked to the bundle  ----- //
// 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: PATHS.html,
  filename: 'index.html',
  inject: 'body'
});

const baseConfig = {
    entry: {
      index: PATHS.js,
    },
    output: {
      filename: '[name]_bundle.js',
      path: PATHS.output,
    },
    module: {
      rules: [{
        // converts <img src="image.png"> to (require('./image.png')). 
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        }
      }, {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'resolve-url-loader' }, // url() will be relative to .scss sourcefile
        ],
      }, {
        test: /\.(png|jpg|svg|)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
          }
        }]
      }, {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader",
            options: {
              minimize: true,
              sourceMap: true,
            }
          }, {
            loader: 'postcss-loader' // allows for postcss autoprefixer in conjunction with postcss.config.js file
          }, {
            loader: "resolve-url-loader"
          }, {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            }
          }]
        })
      }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [require('@babel/plugin-proposal-object-rest-spread')],
          }
        }
      }]
    },
    plugins: [
      HtmlWebpackPluginConfig,
      extractSass,
    ]
  }
  // export configuration
module.exports = baseConfig;

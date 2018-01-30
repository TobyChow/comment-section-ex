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
  plugins
 */

// ----- Creates a seperate index.html file in dist that has script tag linked to the bundle  ----- //
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
      filename: '[name].js',
      path: PATHS.output,
    },
    module: {
      rules: [{
        // converts <img src="image.png"> to (require('./image.png')). 
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        }
      },{
        test: /\.css$/,
        use: [
          { loader: 'style-loader', options:{sourceMap:true} },
          { loader: 'css-loader', options:{sourceMap:true} },
        ],
      }, {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ],
      }, {
        test: /\.(png|jpg|svg|)$/i,
        use: [{
          loader: 'file-loader',
        }]
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
    ]
  }
  // export configuration
module.exports = baseConfig;

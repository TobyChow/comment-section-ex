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

/*****************************************************************************
 *
 * BrowserSync - live reload on all devices
 *
 ****************************************************************************/

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const browserSyncPlug =   new BrowserSyncPlugin(
      // BrowserSync options 
      {
        // browse to http://localhost:3000/ during development 
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint 
        // (which should be serving on http://localhost:8080/) 
        // through BrowserSync 
        proxy: 'http://localhost:8080/' // default webpack port
      },
      // plugin options 
      {
        // prevent BrowserSync from reloading the page 
        // and let Webpack Dev Server take care of this 
        // (not working for some reason, let browsersync reload for now)
        reload: true
      }
    )
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
      browserSyncPlug,
    ]
  }
  // export configuration
module.exports = baseConfig;

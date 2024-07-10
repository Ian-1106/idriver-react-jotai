const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  title
} = require('./config.json');
const CopyPlugin = require('copy-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
  output: {
    path: path.join(__dirname, "/dist"), // the bundle output path
    publicPath: '/',
    filename: '[name].js', // the name of the bundle
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: title,
      template: "src/index.html", // to import index.html file inside index.js
      inject: true,
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/public', to: path.resolve(__dirname, "dist/"), noErrorOnMissing: true }]
    }),
  ],
  entry: {
    vendors: ['react', 'react-dom'],
    app: [__dirname + '/src/index.jsx'],

  },
  resolve: {
    extensions: ['.js', '.jsx', '.styl'],
    alias: {
      Config: __dirname + '/config.dev.json',
    }
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.styl?/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|jpg|svg)$/, // to import images and fonts
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
};
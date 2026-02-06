const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // Cleans the dist folder before every build so old files don't pile up
    clean: true,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    watchFiles: ['src/**/*'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        // Pipes CSS through PostCSS (Tailwind v4 engine)
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.html$/i,
        // This tells Webpack to look at <img src="..."> tags in your HTML
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // Modern Webpack 5 way to handle images
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 1. Move your index.html from /dist to /src
      // 2. Point this template to that src/index.html file
      template: './src/index.html',
    }),
  ],
};

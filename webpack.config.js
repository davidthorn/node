const path = require('path');

module.exports = {
  mode: "development",
  watch: true,
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [ /node_modules/ , /config/ ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.html' , '.css' ]
  },
  devServer: {
    port: 3001,
    contentBase: './dist',
    watchContentBase: true
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
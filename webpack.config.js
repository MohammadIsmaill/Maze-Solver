const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  performance:{
      hints:false
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CopyPlugin({
       patterns: [
      {from: 'public'}
    ]
    })
  ]

};
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  entry: path.join(__dirname, 'src', 'index.ts'),
  //entry: './src/server.ts',
  mode: NODE_ENV,
  target: 'node',
  watch: NODE_ENV === 'development',
  externals: [nodeExternals()],
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new Dotenv()
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({})
    ],
    fallback: {
      util: false,
      buffer: false,
      path: false,
      stream: false,
      http: false,
      zlib: false,
      crypto: false,
      assert: false,
      fs: false,
      net: false
    }
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};

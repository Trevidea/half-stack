const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      timers: require.resolve('timers-browserify'),
    },
  },
  plugins: [
    // You may need to define global variables if your code relies on Node.js globals.
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};      
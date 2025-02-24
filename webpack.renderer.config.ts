import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    { loader: 'postcss-loader' } // <== add this
  ]
})

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    fallback: {
      fs: false, // Disable fs polyfill (not needed in renderer)
      path: require.resolve('path-browserify'), // Polyfill for path
      url: require.resolve('url/'), // Polyfill for url
    },
  },
};

const baseConfig = require('./base-config');

/**
 * @type {import('esbuild').BuildOptions}
 */
const productionConfig = {
  ...baseConfig,
  minify: true,
  sourcemap: false,
  entryNames: '[name].[hash]',
  splitting: true,
  define: {
    'process.env.NODE_ENV': '"production"'
  },
};

module.exports = productionConfig;

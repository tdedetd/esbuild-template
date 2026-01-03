const baseConfig = require('./base-config');

/**
 * @type {import('esbuild').BuildOptions}
 */
const devConfig = {
  ...baseConfig,
  minify: false,
  sourcemap: 'linked',
  define: {
    'process.env.NODE_ENV': '"development"'
  },
};

module.exports = devConfig;

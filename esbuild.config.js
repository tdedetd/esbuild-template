const esbuild = require('esbuild');
const productionConfig = require('./esbuild/production-config');
const devConfig = require('./esbuild/dev-config');

async function buildProd() {
  console.log('Starting production build...');
  await esbuild.build(productionConfig);
  console.log('Production build completed!');
}

async function buildDev() {
  const ctx = esbuild.context(devConfig);
  (await ctx).watch();
  console.log('Development server watching for changes...');

  /**
   * @type {import('esbuild').ServeOptions}
   */
  const serverOptions = {
    servedir: 'dist',
    port: 8080,
    host: '0.0.0.0',
  };

  (await ctx).serve(serverOptions);

  console.log(`Server running at http://${serverOptions.host}:${serverOptions.port}`);
}

const args = process.argv.slice(2);
if (args.includes('--dev') || args.includes('--watch')) {
  buildDev();
} else {
  buildProd();
}

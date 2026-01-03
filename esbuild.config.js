const esbuild = require('esbuild');
const baseConfig = require('./esbuild/base-config');

async function buildProd() {
  console.log('Starting production build...');

  await esbuild.build({
    ...baseConfig,
    minify: true,
    sourcemap: false,
    outdir: 'dist',
    entryNames: '[name].[hash]',
    splitting: true,
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  });

  console.log('Production build completed!');
}

const args = process.argv.slice(2);
if (args.includes('--dev') || args.includes('--watch')) {
  
} else {
  buildProd();
}

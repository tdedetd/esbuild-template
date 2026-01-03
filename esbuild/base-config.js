const path = require('path');

const esbuildPluginClean = require('esbuild-plugin-clean');
const htmlPlugin = require('./plugins/html-plugin');
const createDistDirPlugin = require('./plugins/create-dist-dir-plugin');
const writeOutputFilesPlugin = require('./plugins/write-output-files-plugin');

/**
 * @type {import('esbuild').BuildOptions}
 */
const baseConfig = {
  entryPoints: ['src/typescript/index.ts'],
  bundle: true,
  outdir: 'dist',
  outbase: 'src',
  sourcemap: true,
  target: ['es2020'],
  tsconfig: path.join(process.cwd(), 'tsconfig.json'),
  treeShaking: true,
  platform: 'browser',
  format: 'esm',
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.js': 'js',
    '.jsx': 'jsx',
    '.css': 'css',
    '.json': 'json',
    '.svg': 'file',
    '.png': 'file',
    '.jpg': 'file',
    '.gif': 'file'
  },
  plugins: [
    createDistDirPlugin,
    esbuildPluginClean.clean({
      patterns: ['./dist/*', './dist/assets/*.map.js'],
      cleanOnStartPatterns: ['./prepare'],
      cleanOnEndPatterns: ['./post'],
    }),
    writeOutputFilesPlugin,
    htmlPlugin,
  ],
  write: false,
};

module.exports = baseConfig;

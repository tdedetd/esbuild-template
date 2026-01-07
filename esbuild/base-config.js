const path = require('path');

const esbuildPluginClean = require('esbuild-plugin-clean');
const { sassPlugin } = require('esbuild-sass-plugin');
const htmlPlugin = require('./plugins/html-plugin');
const createDistDirPlugin = require('./plugins/create-dist-dir-plugin');
const writeOutputFilesPlugin = require('./plugins/write-output-files-plugin');

const cwd = process.cwd();

/**
 * @type {import('esbuild').BuildOptions}
 */
const baseConfig = {
  entryPoints: [
    'src/typescript/index.ts',
    'src/styles/styles.scss',
  ],
  bundle: true,
  outdir: 'dist',
  outbase: 'src',
  sourcemap: true,
  target: ['es2020'],
  tsconfig: path.join(cwd, 'tsconfig.json'),
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
    '.gif': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
  },
  plugins: [
    createDistDirPlugin,
    esbuildPluginClean.clean({
      patterns: ['./dist/*', './dist/assets/*.map.js'],
      cleanOnStartPatterns: ['./prepare'],
      cleanOnEndPatterns: ['./post'],
    }),
    sassPlugin({
      type: 'css',
      loadPaths: [
        path.join(cwd, 'src/styles'),
        path.join(cwd, 'node_modules'),
      ],
    }),
    writeOutputFilesPlugin,
    htmlPlugin,
  ],
  write: false,
};

module.exports = baseConfig;

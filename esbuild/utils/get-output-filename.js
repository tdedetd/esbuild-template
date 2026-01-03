const path = require('path');

/**
 * @type {(outputFile: import('esbuild').OutputFile) => string}
 */
const getOutputFilename = (outputFile) => {
  return path.parse(outputFile.path).base;
}

module.exports = getOutputFilename;

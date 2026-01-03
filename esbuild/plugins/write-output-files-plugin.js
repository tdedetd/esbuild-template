const fs = require('fs');
const path = require('path');
const getOutputFilename = require('../utils/get-output-filename');

/**
 * @type {import('esbuild').Plugin}
 */
const writeOutputFilesPlugin = {
  name: 'write-output-files-plugin',
  setup: (build) => {
    build.onEnd((result) => {
      if (!result.errors.length && result.outputFiles) {
        const cwd = process.cwd();

        result.outputFiles.forEach((file) => {
          const filename = getOutputFilename(file);
          fs.writeFileSync(path.join(cwd, 'dist', filename), file.contents);
          console.log(`- ${filename} has been written`);
        });
      }
    });
  },
};

module.exports = writeOutputFilesPlugin;

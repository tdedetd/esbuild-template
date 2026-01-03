const fs = require('fs');
const path = require('path');

/**
 * @type {import('esbuild').Plugin}
 */
const createDistDirPlugin = {
  name: 'create-dist-dir-plugin',
  setup: (build) => {
    build.onStart(() => {
      const cwd = process.cwd();
      const dir = path.join(cwd, 'dist');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    });
  },
};

module.exports = createDistDirPlugin;

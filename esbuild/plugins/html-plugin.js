const fs = require('fs');
const path = require('path');

const HtmlEsbuild = require('./utils/html-esbuild');

/**
 * @type {import('esbuild').Plugin}
 */
const htmlPlugin = {
  name: 'html-plugin',
  setup: (build) => {
    build.onEnd(({ outputFiles }) => {
      const htmlSrc = path.join(process.cwd(), 'src/index.html');
      const htmlOut = path.join(process.cwd(), 'dist/index.html');

      if (fs.existsSync(htmlSrc)) {
        new HtmlEsbuild(htmlSrc, outputFiles)
          .insertScripts()
          .insertStyles()
          .save(htmlOut);

        console.log('- index.html has been processed and copied');
      }
    });
  },
};

module.exports = htmlPlugin;

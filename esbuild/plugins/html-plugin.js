const fs = require('fs');
const path = require('path');
const getOutputFilename = require('./utils/get-output-filename');

/**
 * @type {import('esbuild').Plugin}
 */
const htmlPlugin = {
  name: 'html-plugin',
  setup: (build) => {
    build.onEnd((buildResult) => {
      const htmlSrc = path.join(process.cwd(), 'src/index.html');
      const htmlOut = path.join(process.cwd(), 'dist/index.html');

      if (fs.existsSync(htmlSrc)) {
        let htmlContent = fs.readFileSync(htmlSrc, 'utf8');
        htmlContent = htmlContent.replace(
          /<script.*src=["']\.\/.*\.(js|ts|tsx)["'].*><\/script>/g,
          `<script src="./${getOutputFilename(buildResult.outputFiles[0])}"></script>`
        );

        fs.writeFileSync(htmlOut, htmlContent);
        console.log('- index.html has been processed and copied');
      }
    });
  },
};

module.exports = htmlPlugin

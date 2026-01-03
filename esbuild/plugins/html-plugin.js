const fs = require('fs');
const path = require('path');
const getOutputFilename = require('./utils/get-output-filename');

const mapFileRegex = /^.*\.map$/;

/**
 * @type {(outputFiles: import('esbuild').OutputFile[] | undefined) => string}
 */
function getScriptTags(outputFiles) {
  if (!outputFiles) {
    return '';
  }

  return outputFiles
    .map((outputFile) => getOutputFilename(outputFile))
    .filter((filename) => !(mapFileRegex.test(filename)))
    .map((filename) => `<script src="./${filename}"></script>`)
    .join('');
}

/**
 * @type {(html: string, str: string) => string}
 */
function insertStringToEndingOfBody(html, str) {
  const position = html.lastIndexOf('</body>');
  return `${html.slice(0, position)}${str}${html.slice(position)}`;
}

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
        const scriptTags = getScriptTags(outputFiles);
        const htmlContent = insertStringToEndingOfBody(
          fs.readFileSync(htmlSrc, 'utf8'),
          scriptTags
        );

        fs.writeFileSync(htmlOut, htmlContent);
        console.log('- index.html has been processed and copied');
      }
    });
  },
};

module.exports = htmlPlugin;

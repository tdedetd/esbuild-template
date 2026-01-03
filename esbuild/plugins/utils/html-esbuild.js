const fs = require('fs');
const getOutputFilename = require('../../utils/get-output-filename');

class HtmlEsbuild {
  /**
   * @param {string} htmlSrc 
   * @param {import('esbuild').OutputFile[] | undefined} outputFiles
   */
  constructor(htmlSrc, outputFiles) {
    this.html = fs.readFileSync(htmlSrc, 'utf8');
    this.outputFiles = outputFiles;
  }

  /**
   * @returns this
   */
  insertScripts() {
    return this._insertBefore(
      '</body>',
      /^.*\.js$/,
      (filename) => `<script src="./${filename}"></script>`
    );
  }

  /**
   * @returns this
   */
  insertStyles() {
    return this._insertBefore(
      '</head>',
      /^.*\.css$/,
      (filename) => `<link rel="stylesheet" href="./${filename}">`
    );
  }

  /**
   * @param {string} htmlOut 
   * @returns void
   */
  save(htmlOut) {
    fs.writeFileSync(htmlOut, this.html);
  }

  /**
   * @param {'</body>' | '</head>'} locator
   * @param {RegExp} regex
   * @param {(str: string) => string} mask
   * @returns this
   */
  _insertBefore(locator, regex, mask) {
    const str = this._getFilesString(regex, mask);
    const position = this.html.lastIndexOf(locator);
    this.html = `${this.html.slice(0, position)}${str}${this.html.slice(position)}`;
    return this;
  }

  /**
   * @param {RegExp} regex
   * @param {(str: string) => string} mask
   * @returns string
   */
  _getFilesString(regex, mask) {
    if (!this.outputFiles) {
      return '';
    }

    return this.outputFiles
      .map((outputFile) => getOutputFilename(outputFile))
      .filter((filename) => regex.test(filename))
      .map(mask)
      .join('');
  }
}

module.exports = HtmlEsbuild;

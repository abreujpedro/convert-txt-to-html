const { readFile, writeFile } = require('fs').promises;
const { join } = require('path');
const errors = require('./errors');

class File {
  static async txtToHTML(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);
    if (validation.valid) {
      const arrayContent = content
        .replace(/\r/g, '')
        .split('\n')
        .map((paragraph) => `<p>${paragraph}</p>`);
      const newContent = arrayContent.join('\n');
      const exampleHtmlPath = join(__dirname, './../template.html');
      const exampleHtml = (await readFile(exampleHtmlPath)).toString('utf8');
      const newHtmlContent = exampleHtml.replace('{ext}', newContent);
      const newHtmlPath = join(__dirname, './../new.html');
      await writeFile(newHtmlPath, newHtmlContent);
    } else {
      console.error('error:', validation.error);
    }
  }

  static async getFileContent(filePath) {
    const fileName = join(__dirname, filePath);
    const result = (await readFile(fileName)).toString('utf8');
    return result;
  }

  static isValid(text) {
    const validation = { valid: true, error: null };
    function verifyError(verify, error) {
      if (!verify) {
        validation.valid = false;
        validation.error =
          validation.error !== null ? validation.error + ', ' + error : error;
      }
    }
    const textWithoutSpace = text.replace(/\s/g, '').replace(/\n/g, '');
    const isWithCorrectLenght = textWithoutSpace.length >= 2;
    const isWithCorrectParagraphs = text.split('\n').length >= 2;
    verifyError(isWithCorrectLenght, errors.FILE_TEXT_LENGTH);
    verifyError(isWithCorrectParagraphs, errors.FILE_PARAGRAPHS_LENGTH);
    return validation;
  }
}

File.txtToHTML('../mocks/test.txt');

const { readFile, writeFile } = require('fs').promises;
const { join } = require('path');
const errors = require('./errors');

class File {
  static async txtToHTML(
    filePath,
    nameNewHtml,
    options = { minLetters: 4, minParagraphs: 2 },
  ) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content, options);
    if (validation.valid) {
      const arrayContent = content
        .replace(/\r/g, '')
        .split('\n')
        .map((paragraph) => `<p>${paragraph}</p>`);
      const newContent = arrayContent.join('\n');
      const exampleHtmlPath = join(__dirname, './../template.html');
      const exampleHtml = (await readFile(exampleHtmlPath)).toString('utf8');
      const newHtmlContent = exampleHtml.replace('{ext}', newContent);
      const newHtmlPath = join(__dirname, `../${nameNewHtml}.html`);
      await writeFile(newHtmlPath, newHtmlContent);
    } else {
      throw new Error(validation.error);
    }
  }

  static async getFileContent(filePath) {
    const fileName = join(__dirname, `../${filePath}`);
    const result = (await readFile(fileName)).toString('utf8');
    return result;
  }

  static isValid(text, options) {
    const minLettersLength = options.minLetters;
    const minParagraphsLength = options.minParagraphs;
    const validation = { valid: true, error: null };
    function verifyError(verify, error) {
      if (!verify) {
        validation.valid = false;
        validation.error =
          validation.error !== null ? validation.error + ',' + error : error;
      }
    }
    const textWithoutSpace = text.replace(/\s/g, '').replace(/\n/g, '');
    const isWithCorrectLenght = textWithoutSpace.length >= minLettersLength;
    const isWithCorrectParagraphs =
      text.split('\n').length >= minParagraphsLength;
    verifyError(isWithCorrectLenght, errors.FILE_TEXT_LENGTH);
    verifyError(isWithCorrectParagraphs, errors.FILE_PARAGRAPHS_LENGTH);
    return validation;
  }
}

/*You can use File.txtToHtml() to take a txt file content and put in a HTML,
 the program will search for {ext} and replace the it using the content of TXT file, 
 you also can change the options, as default you need to have a txt with at least 4 letters and 
 2 paragraphs, but you can change it passing as third param to File.txtToHtml() an object 
 like that: {maxParagraphs: <value>, maxLetters: <value> }*/

//Examples of invalids Files:
// File.txtToHTML('../mocks/invalid_letters_paragraphs.txt', 'new');
// File.txtToHTML('./mocks/invalid_letters.txt', 'new');
// File.txtToHTML('../mocks/invalid_paragraphs.txt', 'new');

module.exports = File;

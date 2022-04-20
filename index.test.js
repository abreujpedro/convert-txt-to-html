const errors = require('./src/errors');
const File = require('./src/file');
const { join } = require('path');
const { readdir, unlink } = require('fs').promises;

describe('Testing puting content of txt into html', () => {
  test('should return a error about letters', async () => {
    const myError = new Error(errors.FILE_TEXT_LENGTH);
    const getBadResults = async () => {
      await File.txtToHTML('./mocks/invalid_letters.txt', 'new');
    };
    expect(getBadResults()).rejects.toEqual(myError);
  });
  test('should return a error about paragraphs', async () => {
    const myError = new Error(errors.FILE_PARAGRAPHS_LENGTH);
    const getBadResults = async () => {
      await File.txtToHTML('./mocks/invalid_paragraphs.txt', 'new');
    };
    expect(getBadResults()).rejects.toEqual(myError);
  });
  test('should return a error about letters and paragraphs', async () => {
    const myError = new Error(
      errors.FILE_TEXT_LENGTH + ',' + errors.FILE_PARAGRAPHS_LENGTH,
    );
    const getBadResults = async () => {
      await File.txtToHTML('./mocks/invalid_letters_paragraphs.txt', 'new');
    };
    expect(getBadResults()).rejects.toEqual(myError);
  });
  test('should create a new html file if does not exist', async () => {
    const nameHtml = 'nxdxdxdxsssK2'; //random name
    await File.txtToHTML('./mocks/valid.txt', nameHtml);
    const dirList = await readdir(__dirname);
    expect(dirList).toContain(nameHtml + '.html');
    const newHtmlPath = join(__dirname, nameHtml + '.html');
    await unlink(newHtmlPath);
  });
});

import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('ListCRUD', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:8888';

  beforeAll(async () => {
    server = fork(`${__dirname}../../../../js/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await page.waitForTimeout(5000);
    await browser.close();
    server.kill();
  });

  test('should add do something', async () => {
    await page.goto(baseUrl);
  });

  test('buttons', async () => {
    await page.goto(baseUrl);

    const buttonAdd = await page.$('.button-add');
    buttonAdd.click();

    await page.type('.field-title', 'test');
    await page.waitForTimeout(2000);
    await page.type('.field-price', '123');
    await page.waitForTimeout(2000);

    const buttonSave = await page.$('.button-save');
    buttonSave.click();
    await page.waitForTimeout(2000);

    const buttonEdit = await page.$('.button-edit');
    buttonEdit.click();
    await page.waitForTimeout(2000);

    await page.type('.field-title', 'test123');
    await page.waitForTimeout(2000);
    buttonSave.click();
    await page.waitForTimeout(2000);

    const buttonDelete = await page.$('.button-delete');
    const buttonReallyDelete = await page.$('.button-really-delete');
    buttonDelete.click();
    await page.waitForTimeout(2000);
    buttonReallyDelete.click();
  });
});

import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { url } from './utils';

const Analyzer = (async () => {
  const initPage = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
  }
  
  const getTitle = async (page: puppeteer.Page) => {
    const label = '.wrapper > div > span > .opblock-tag-section > .opblock-tag > a > span';
    await page.waitForSelector(label, { timeout: 0 });
    const titles = await page.$$eval(label, (labels: Element[]) => labels.map((item: Element) => item.innerHTML));
    return titles;
  }

  const init = async () => {
    const page = await initPage();
    const titles = await getTitle(page);
    // await writeFiles(titles)
    // await page.close();
    return titles;
  }

  const data = await init();
  console.log(data)
  return data;
})()

export default Analyzer;
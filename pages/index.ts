import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { url } from '../pages/utils/utils';

interface IAPIData {
  path: string | null | undefined;
  method: string | undefined;
  description: string | undefined;
}
class Analyzer{
  private static instance: Analyzer;

  static getInstance() {
    if (!Analyzer.instance) {
      Analyzer.instance = new Analyzer();
    }
    return Analyzer.instance;
  }

  private async initPage() {
    const browser = await puppeteer.launch({
      headless: false,
      // defaultViewport: {
      //   width: 2000,
      //   height: 1000
      // }
    });
    const page = await browser.newPage();
    await page.goto(url);
    return page;
  }

  private async getTitle(page: puppeteer.Page) {
    const label = '.wrapper > section > div > span > .opblock-tag-section > .opblock-tag > a > span';
    await page.waitForSelector(label, { timeout: 5000 });
    const titles = await page.$$eval(label, labels => labels.map(item => item.innerHTML));
    return titles;
  }

  // 打开隐藏内容
  private async openInfo(page: puppeteer.Page, titles: string[]) {
    for (let i = titles.length - 1; i >= 0; i--) {
      const label = `.wrapper > section > div > span > .opblock-tag-section > #operations-tag-${titles[i]}`;
      await page.waitForSelector(label, { timeout: 10000 });
      await page.click(label)
    }
  }

  // 获取url路径
  private async getAPIData(page: puppeteer.Page) {
    const label = `.wrapper > section > div > span > .opblock-tag-section > .no-margin > span > .opblock > .opblock-summary`;
    await page.waitForSelector(label, { timeout: 10000 });
    const APIData = await page.$$eval(label, labels => {
      const data: IAPIData[] = [];
      labels.map(item => {
        const method = item.querySelector('.opblock-summary-method')?.innerHTML;
        const path = item.querySelector('.opblock-summary-path')?.getAttribute('data-path');
        const description = item.querySelector('.opblock-summary-description')?.innerHTML;
        data.push({ method, path, description })
      })
      return data;
    });

    return APIData;
  }

  private async writeFiles(data: IAPIData[]) {
    return await fs.writeFileSync("./data/data.json", JSON.stringify(data, null, "\t"));
  }

  public async init() {
    const page = await this.initPage();
    const titles = await this.getTitle(page);
    await this.openInfo(page, titles);
    const data = await this.getAPIData(page)
    // await page.close();

    await this.writeFiles(data)
  }

  constructor() {
    this.init();
  }
}

new Analyzer()
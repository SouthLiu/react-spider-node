import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { url } from '../pages/utils/utils';

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
      headless: false
    });
    const page = await browser.newPage();
    await page.goto(url);
    return page;
  }

  private async getTitle(page: puppeteer.Page) {
    const label = '.wrapper > section > div > span > .opblock-tag-section > .opblock-tag > a > span';
    await page.waitForSelector(label, { timeout: 0 });
    const titles = await page.$$eval(label, (labels: Element[]) => labels.map((item: Element) => item.innerHTML));
    return titles;
  }

  // 打开隐藏内容
  private async openInfo(page: puppeteer.Page, titles: string[]) {
    for (let i = titles.length - 1; i >= 0; i--) {
      const label = `.wrapper > section > div > span > .opblock-tag-section > #operations-tag-${titles[i]}`;
      await page.waitForSelector(label, { timeout: 3000 });
      await page.click(label)
    }
  }

  private async writeFiles(data: string[]) {
    return await fs.writeFileSync("./data/data.json", JSON.stringify(data, null, "\t"));
  }

  public async init() {
    const page = await this.initPage();
    const titles = await this.getTitle(page);
    await this.openInfo(page, titles);
    // await page.close();

    await this.writeFiles(titles)
  }

  constructor() {
    this.init();
  }
}

new Analyzer()
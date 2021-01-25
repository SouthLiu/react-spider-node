import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { url } from './utils';

class Analyzer{
  private static instance: Analyzer;
  public titles: string[] = [];

  static getInstance() {
    if (!Analyzer.instance) {
      Analyzer.instance = new Analyzer();
    }
    return Analyzer.instance;
  }

  private async initPage() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
  }

  private async getTitle(page: puppeteer.Page) {
    const label = '.wrapper > div > span > .opblock-tag-section > .opblock-tag > a > span';
    await page.waitForSelector(label, { timeout: 0 });
    const titles = await page.$$eval(label, (labels: Element[]) => labels.map((item: Element) => item.innerHTML));
    this.titles = titles;
    return titles;
  }

  public async init() {
    const page = await this.initPage();
    const titles = await this.getTitle(page);
    await page.close();

    return await titles;
  }

  constructor() {
    this.init();
  }
}

export default Analyzer;
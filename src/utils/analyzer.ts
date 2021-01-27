import fs from 'fs';
import puppeteer from 'puppeteer';
import { filterAPIData } from '../utils/filter';
import { IAPIData } from '../utils/types';
import { url } from '../utils/utils';

class Analyzer{
  private static instance: Analyzer;
  private map: Map<string, IAPIData[]> = new Map();

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

  // 获取url数据
  private async getAPIData(page: puppeteer.Page) {
    const label = `.wrapper > section > div > span > .opblock-tag-section > .no-margin > span > .opblock > .opblock-summary`;
    await page.waitForSelector(label, { timeout: 10000 });
    const APIData = await page.$$eval(label, labels => {
      const data: IAPIData[] = [];
      labels.forEach(item => {
        const method = item.querySelector('.opblock-summary-method')?.innerHTML;
        const path = item.querySelector('.opblock-summary-path')?.getAttribute('data-path');
        const description = item.querySelector('.opblock-summary-description')?.innerHTML;
        const datas = { method, path, description };
        data.push(datas)
      })
      return data;
    });
    return APIData;
  }

  // TODO: 待优化
  // 过滤API数据
  private filterAPIData(datas: IAPIData[]) {
    datas.length && datas.forEach(item => {
      const { method, path, description } = item;
      const key = path?.split('/')[1] as string;
      const isExist = this.map.has(key);
      const mapData = isExist ? [item].concat(this.map.get(key) as IAPIData[]) : [item];
      this.map.set(key, mapData as IAPIData[])
    })
  }

  // 写入API文件
  private writeAPIFiles() {
    this.map.forEach((item, key) => {
      const data = filterAPIData(item)
      this.writeFiles(key, data)
      // console.log('data:', data)
    })
  }

  private writeFiles(fileName: string, data: string[]) {
    return fs.writeFileSync(`./src/api/${fileName}.ts`, data.join(''));
  }

  public async init() {
    const page = await this.initPage();
    const titles = await this.getTitle(page);
    await this.openInfo(page, titles);
    const APIData = await this.getAPIData(page)
    const data = this.filterAPIData(APIData);
    this.writeAPIFiles()
    // await page.close();
  }

  constructor() {
    this.init();
  }
}

// new Analyzer()
export default Analyzer;
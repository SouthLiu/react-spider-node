const fs = require("fs");
const path = require('path')
const puppeteer = require('puppeteer');
// const puppeteer = require('puppeteer-core');
interface IItem {
  innerText: string;
}

(async () => {
  let data: string[] = [];
  const filtPath = path.resolve(__dirname, '../data/data.json');
  //启动浏览器
  const browers = await puppeteer.launch({
    headless: true, // 有头模式
    userDataDir: "../data",
  });
  //启动新页面
  const page = await browers.newPage();

  for(let month = 1; month <= 2; month++) {
      for(let pages = 1; pages <= 2; pages++) {
        const url = `https://www.bilibili.com/v/anime/serial/#/all/click/0/${pages}/2020-${month < 10 ? '0' + month : month}-1,2020-${month < 10 ? '0' + month : month}-29`;
        const label = '.vd-list-cnt > ul > li > div > div.r > a';
        await page.goto(url);
        await page.waitForSelector(label, { timeout: 0 });
        let titles = await page.$$eval(label, (labels: IItem[]) => labels.map((item: IItem) => item.innerText))
        console.log(titles)
        data = data.concat(titles);
      }
  }
  
  // const infoPath = path.resolve(__dirname, '../data')
  // fs.writeFileSync(filtPath, data)

  fs.writeFile("./data/data.json", JSON.stringify(data, null, "\t"), function (err: string) {
    if (err) {
      console.log('err:', err);
    }
  });
  await browers.close();
})()
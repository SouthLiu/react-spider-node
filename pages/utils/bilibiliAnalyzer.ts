import puppeteer from 'puppeteer';

const analyzer = (async () => {
  let data: string[] = [];
  //启动浏览器
  const browers = await puppeteer.launch({
    headless: false, // 有头模式
  });
  //启动新页面
  const page = await browers.newPage();

  for(let month = 1; month <= 2; month++) {
      for(let pages = 1; pages <= 2; pages++) {
        const url = `https://www.bilibili.com/v/anime/serial/#/all/click/0/${pages}/2020-${month < 10 ? '0' + month : month}-1,2020-${month < 10 ? '0' + month : month}-29`;
        const label = '.vd-list-cnt > ul > li > div > div.r > a';
        await page.goto(url);
        await page.waitForSelector(label, { timeout: 0 });
        let titles = await page.$$eval(label, (labels: Element[]) => labels.map((item: Element) => item.innerHTML))
        console.log(titles)
        data = data.concat(titles);
      }
  }
  
  // const infoPath = path.resolve(__dirname, '../data')
  // fs.writeFileSync(filtPath, data)
  await browers.close();

  console.log(data)

  return await data;
})()

export default analyzer;

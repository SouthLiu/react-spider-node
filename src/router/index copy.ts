import fs from 'fs'
import jszip from 'jszip';
import { Request, Response, Router } from 'express';
import Analyzer from '../utils/analyzer';
import Crowler from '../utils/crawler';
import { filterAPIData } from '../utils/filter';
import { getResponseData } from '../utils/response'
import path from 'path';

const router = Router();

router.get('/', (request, response) => {
  response.send('asd');
})

router.post('/analzer', async (request, response) => {
  const { url } = request.body;
  if (url) {
    const analyzer = await Analyzer.getInstance().getData(url);
    new Crowler(analyzer)
    response.send('url正确')
  } else {  
    response.send('url 不正确')
  }
})

router.post('/zip', async (request, response) => {
  const { url, fileName } = request.body;
  console.log(url)
  const zip = new jszip();
  const analyzer = await Analyzer.getInstance().getData(url);
  const apiFile = zip.folder('api') as jszip;
  const filePath = path.join(__dirname, `../data/${fileName}.zip`);
  analyzer.forEach((item, key) => {
    // const keyFile = apiFile.folder(key) as jszip;
    const value = filterAPIData(item);
    apiFile.file(`${key}.ts`, value.toString());
  })
  zip.generateNodeStream({type:'nodebuffer',streamFiles:true})
  .pipe(fs.createWriteStream(filePath))  //打包后的包名可以自己根据需求定义，路径可以根据需求更改
  .on('finish', function () {
    console.log("out.zip written.");   // 管道写完数据后，打印出提示
    response.json(getResponseData(500, '生成zip成功'))
  });
})

router.get('/down/:fileName', (request, response) => {
  const fileName = request.params.fileName;
  downFile(fileName, response);
})

// 下载文件
function downFile(fileName: string | number, response: Response) {
  console.log('down')
  // 实现文件下载 
  const filePath = path.join(__dirname, `../../src/data/${fileName}.zip`);
  const stats = fs.statSync(filePath); 
  if(stats.isFile()){
    response.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${fileName}.zip`,
      'Content-Length': stats.size
    });
    fs.createReadStream(filePath).pipe(response);
    response.json(getResponseData(500, '下载成功'))
  } else {
    response.end(404);
  }
}


export default router;
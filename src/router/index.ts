import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import jszip from 'jszip';
import { NextFunction, Request, Response, Router } from 'express';
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
    // response.send(`<a href="/down/${fileName}">download</a>`)
    response.json(getResponseData(500, '生成zip成功'))
  });
})

router.get('/down/:fileName', (request, response, next) => {
  const fileName = request.params.fileName;
  const filePath = path.join(__dirname, `../data/${fileName}.zip`);
  downFile(fileName, response, next);
  setTimeout(() => {
    deleteFile(filePath);
  }, 3000);
})

// 下载文件
function downFile(fileName: string | number, response: Response, next: NextFunction) {
  console.log('down')
  // 实现文件下载 
  const filePath = path.join(__dirname, `../data/${fileName}.zip`);
  const stats = fs.statSync(filePath); 
  if(!stats.isFile()){
    response.end(404);
  }
  response.set({
    'Content-Type': 'application/x-zip-compressed',
    'Content-Disposition': `attachment; filename=${fileName}`,
    'Content-Length': stats.size
  });
  response.download(filePath, `${fileName}.zip`, (err) => {
    err && console.log('download err:', err)
  });
}

// 删除文件
function deleteFile(filePath: string) {
  fs.unlinkSync(filePath)
}


export default router;
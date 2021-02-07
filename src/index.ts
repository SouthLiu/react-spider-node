import express from 'express';
import router from './router';
import bodyParser from 'body-parser';

const app = express();

app.all("*", function(request, response, next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  var orginList=[
    "http://localhost:5000.com",
    "http://www.baidu.com",
  ]
  const originUrl = request.headers.origin?.toLowerCase();
  if(orginList.includes(originUrl as string)){
      //设置允许跨域的域名，*代表允许任意域名跨域
      response.header("Access-Control-Allow-Origin",request.headers.origin);
  }
  response.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  response.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  response.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (request.method.toLowerCase() == 'options')
    response.send(200);  //让options尝试请求快速结束
  else
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(5000, () => {
  console.log('server success!');
});

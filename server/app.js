/* app.js 入口模块
 *  创建服务，相关配置：模板引擎、body-parser解析表单、提供静态资源服务
 *  挂载路由，监听端口
 */
const express = require('express');
// const session = require('express-session');
const bodyParser = require('body-parser');
const router = require('./router/router');
const objrouter = require('./router/objrouter');
const userrouter = require('./router/userrouter');
const imgrouter = require('./router/imgrouter');
const videorouter = require('./router/videorouter');
const voicerouter = require('./router/voicerouter');
const loggerrouter = require('./router/loggerrouter');
const upload = require('./upload');
const excelrouter = require('./router/excelrouter');

const app = express();

app.use('/public/', express.static('./public/'));

app.engine('html', require('express-art-template'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }))

// 设置跨域和相应数据格式
app.all('/api/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method == 'OPTIONS') res.send(200)
    /*让options请求快速返回*/
  else next()
})

// 把路由容器挂载到 app 服务中
app.use(router);
app.use(objrouter);
app.use(userrouter);
app.use(imgrouter);
app.use(videorouter);
app.use(voicerouter);
app.use(loggerrouter);
app.use(upload);
app.use(excelrouter);

app.listen(3000, function() {
  console.log('running 3000...')
})

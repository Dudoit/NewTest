/* 路由模块
 *  处理路由
 *  根据不同的请求方法+请求路径设置具体的请求函数
 */
const express = require('express');
const Logger = require('../models/logger');

// 创建一个路由容器
const loggerrouter = express.Router()

// 把路由挂载到 router 路由容器中
loggerrouter.get('/logger', function(req, res) {
  Logger.find(req.query, function(err, logger) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(logger);
  })
});

loggerrouter.post('/logger/new', function(req, res) {
  // 获取表单数据
  // 处理
  // 发送响应
  new Logger(req.body).save(function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('添加成功')
  })
});

loggerrouter.post('/logger/delete', function(req, res) {
  let id = req.body._id.replace(/"/g, '');
  Logger.findByIdAndRemove(id, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('删除成功')
  })
});

module.exports = loggerrouter;

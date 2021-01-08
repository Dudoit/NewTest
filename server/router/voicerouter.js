/* 路由模块
 *  处理路由
 *  根据不同的请求方法+请求路径设置具体的请求函数
 */
const express = require('express');
const Voice = require('../models/voice');

// 创建一个路由容器
const voicerouter = express.Router()

// 把路由挂载到 router 路由容器中
voicerouter.get('/voice', function(req, res) {
  Voice.find(req.query, function(err, voice) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(voice);
  })
});

voicerouter.get('/voice/new', (req, res) => {
  Voice.find(req.query, (err, voice) => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(voice)
  });
});

voicerouter.post('/voice/new', function(req, res) {
  // 获取表单数据
  // 处理
  // 发送响应
  new Voice(req.body).save(function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('添加成功')
  })
});

voicerouter.get('/voice/edit', function(req, res) {
  let body = req.body._id.replace(/"/g, '');
  Voice.findById(body, function(err, voice) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(voice)
  })
});

voicerouter.post('/voice/edit', function(req, res) {
  let body = req.body._id.replace(/"/g, '');
  Voice.findByIdAndUpdate(body, req.body, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('修改成功')
  })
});

voicerouter.post('/voice/delete', function(req, res) {
  let id = req.body._id.replace(/"/g, '');
  Voice.findByIdAndRemove(id, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('删除成功')
  })
});

module.exports = voicerouter;

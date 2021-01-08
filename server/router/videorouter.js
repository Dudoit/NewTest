/* 路由模块
 *  处理路由
 *  根据不同的请求方法+请求路径设置具体的请求函数
 */
const express = require('express');
const Video = require('../models/video');

// 创建一个路由容器
const videorouter = express.Router()

// 把路由挂载到 router 路由容器中
videorouter.get('/video', function(req, res) {
  Video.find(req.query, function(err, video) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(video);
  })
});

videorouter.get('/video/new', (req, res) => {
  Video.find(req.query, (err, video) => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(video)
  });
});

videorouter.post('/video/new', function(req, res) {
  // 获取表单数据
  // 处理
  // 发送响应
  new Video(req.body).save(function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('添加成功')
  })
});

videorouter.get('/video/edit', function(req, res) {
  let body = req.body._id.replace(/"/g, '');
  Video.findById(body, function(err, video) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(video)
  })
});

videorouter.post('/video/edit', function(req, res) {
  let body = req.body._id.replace(/"/g, '');
  Video.findByIdAndUpdate(body, req.body, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('修改成功')
  })
});

videorouter.post('/video/delete', function(req, res) {
  let id = req.body._id.replace(/"/g, '');
  Video.findByIdAndRemove(id, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('删除成功')
  })
});

module.exports = videorouter;

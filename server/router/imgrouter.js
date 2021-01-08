/* 路由模块
 *  处理路由
 *  根据不同的请求方法+请求路径设置具体的请求函数
 */
const express = require('express');
const Img = require('../models/img');

// 创建一个路由容器
const imgrouter = express.Router()

// 把路由挂载到 router 路由容器中
imgrouter.get('/img', function(req, res) {
  Img.find(req.query, function(err, img) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(img);
  })
});

imgrouter.get('/img/new', (req, res) => {
  Img.find(req.query, (err, img) => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(img)
  });
});

imgrouter.post('/img/new', function(req, res) {
  // 获取表单数据
  // 处理
  // 发送响应
  new Img(req.body).save(function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('添加成功')
  })
});

imgrouter.get('/img/edit', function(req, res) {
  let body = req.body._id.replace(/"/g, '');
  Img.findById(body, function(err, img) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(img)
  })
});

imgrouter.post('/img/edit', function(req, res) {
  let body = req.body._id.replace(/"/g, '');
  Img.findByIdAndUpdate(body, req.body, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('修改成功')
  })
});

imgrouter.post('/img/delete', function(req, res) {
  let id = req.body._id.replace(/"/g, '');
  Img.findByIdAndRemove(id, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('删除成功')
  })
});

module.exports = imgrouter;

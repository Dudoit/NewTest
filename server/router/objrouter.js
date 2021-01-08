/* 路由模块
 *  处理路由
 *  根据不同的请求方法+请求路径设置具体的请求函数
 */
const express = require('express');
const Obj = require('../models/objtest');

// 创建一个路由容器
const objrouter = express.Router()

// 把路由挂载到 router 路由容器中
objrouter.get('/obj', function(req, res) {
  Obj.find(req.query, function(err, obj) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(obj);
  })
});

objrouter.get('/obj/new', (req, res) => {
  Obj.find(req.query, (err, obj) => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(obj)
  });
});

objrouter.post('/obj/new', function(req, res) {
  // 获取表单数据
  // 处理
  // 发送响应
  new Obj(req.body).save(function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('添加成功')
  })
});

objrouter.get('/obj/edit', function(req, res) {
  let body = req.body._id.replace(/"/g, '');
  Obj.findById(body, function(err, obj) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(obj)
  })
});

objrouter.post('/obj/edit', function(req, res) {
  let body = req.body._id.replace(/"/g, '');
  Obj.findByIdAndUpdate(body, req.body, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('修改成功')
  })
});

objrouter.post('/obj/delete', function(req, res) {
  let id = req.body._id.replace(/"/g, '');
  Obj.findByIdAndRemove(id, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('删除成功')
  })
});

module.exports = objrouter;

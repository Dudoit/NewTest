/* 路由模块
 *  处理路由
 *  根据不同的请求方法+请求路径设置具体的请求函数
 */
const express = require('express');
const Student = require('../models/student');

// 创建一个路由容器
const router = express.Router()

// 把路由挂载到 router 路由容器中
router.get('/students', function(req, res) {
  Student.find(req.query, function(err, student) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(student);
  })
});

router.get('/students/new', (req, res) => {
  Student.find(req.query, (err, student) => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(student)
  });
});

router.post('/students/new', function(req, res) {
  // 获取表单数据
  // 处理
  // 发送响应
  new Student(req.body).save(function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('添加成功')
  })
});

router.get('/students/edit', function(req, res) {
  let body = req.body._id.replace(/"/g, '');
  Student.findById(body, function(err, student) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(student)
  })
});

router.post('/students/edit', function(req, res) {
  let body = req.body._id.replace(/"/g, '');
  Student.findByIdAndUpdate(body, req.body, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('修改成功')
  })
});

router.post('/students/delete', function(req, res) {
  let id = req.body._id.replace(/"/g, '');
  Student.findByIdAndRemove(id, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('删除成功')
  })
});

module.exports = router;

/* 路由模块
 *  处理路由
 *  根据不同的请求方法+请求路径设置具体的请求函数
 */
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config')
var md5 = require('blueimp-md5');

// 创建一个路由容器
const userrouter = express.Router()

userrouter.post('/register', function(req, res, next) {
  User.findOne({ email: req.body.email }, function(err, data) {
    if (err) {
      return next(err)
    }
    if (data) {
      // 邮箱已存在
      return res.status(200).json({
          err_code: 1,
          message: 'Email aleady exists.'
        })
        // return res.send(`邮箱已存在，请重试`)
    }
    const recommendation = req.body.recommendation
    if (recommendation != 20170346125) {
      return res.status(200).json({
        err_code: 3,
        message: 'password is not true.'
      })
    }
    // 对密码进行 md5 重复加密
    req.body.password = md5(md5(req.body.password))
    new User(req.body).save(function(err, user) {
      if (err) {
        return next(err)
      }

      // Express 提供了一个响应方法：json
      // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
    })
  })
});

userrouter.post('/login', async(req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(200).json({
      err_code: 422,
      message: 'email was not reregisted.'
    })
  }
  const isPasswordValid = await User.findOne({ password: md5(md5(req.body.password)) })
  if (!isPasswordValid) {
    return res.status(200).json({
      err_code: 423,
      message: 'password is not true.'
    })
  }
  const isToken = jwt.sign({ id: String(user._id) }, config.token.secretOrPrivateKey, config.token.options)
  res.send({
    user,
    isToken
  })
})

userrouter.get('/user', function(req, res) {
  User.find(req.query, function(err, user) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(user);
  })
});

userrouter.post('/user/edit', function(req, res) {
  let body = req.body._id.replace(/"/g, '');
  User.findByIdAndUpdate(body, req.body, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('修改成功')
  })
});

userrouter.post('/user/delete', function(req, res) {
  let id = req.body._id.replace(/"/g, '');
  User.findByIdAndRemove(id, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('删除成功')
  })
});

const auth = async(req, res, next) => {
  const raw = String(req.headers.authorization).split(' ').pop()
  const { id } = jwt.verify(raw, config.token.secretOrPrivateKey)
  req.user = await User.findById(id)
  next()
}

userrouter.get('/profile', auth, async(req, res) => {
  res.send(req.user)
})

module.exports = userrouter;

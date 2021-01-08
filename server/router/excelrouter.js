/* 路由模块
 *  处理路由
 *  根据不同的请求方法+请求路径设置具体的请求函数
 */
const express = require('express');
const Excel = require('../models/execl');
var mongoXlsx = require('mongo-xlsx');
// 创建一个路由容器
const excelrouter = express.Router()

var data = [{ title: 'abcd', classify: 'abcde', optiona: 'abcdef', optionb: 'abcdefg', answer: 'abcdefgh' }]

var model = mongoXlsx.buildDynamicModel(data)

const fs = require('fs')

excelrouter.post('/excel/uploads', function(req, res) {
  const excel = fs.readdirSync('./tmplFile')
  const excelL = excel.length - 1
  const isFile = __dirname + '\\' + 'tmplFile' + '\\' + excel[excelL]
  mongoXlsx.xlsx2MongoData(isFile, model, function(err, mongoData) {
    for (let i = 0; i < mongoData.length; i++) {
      new Excel(mongoData[i]).save(function(err) {})
    }
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
});

excelrouter.get('/excel', function(req, res) {
  Excel.find(req.query, function(err, excel) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send(excel);
  })
});

excelrouter.post('/excel/new', function(req, res) {
  // 获取表单数据
  // 处理
  // 发送响应
  new Excel(req.body).save(function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('添加成功')
  })
});

excelrouter.post('/excel/delete', function(req, res) {
  let id = req.body._id.replace(/"/g, '');
  Excel.findByIdAndRemove(id, function(err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.send('删除成功')
  })
});

module.exports = excelrouter;

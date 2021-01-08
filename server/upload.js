const express = require("express");
const upload = express.Router();
const fs = require('fs')
const multiparty = require("multiparty")

upload.post('/upload', function(req, res, next) {
  /* 生成multiparty对象，并配置上传目标路径 */
  let form = new multiparty.Form();
  /* 设置编辑 */
  form.encoding = 'utf-8';
  //设置文件存储路劲
  form.uploadDir = './tmplFile';
  //设置文件大小限制
  // form.maxFilesSize = 1 * 1024 * 1024;
  form.parse(req, function(err, fields, files) {
    try {
      let inputFile = files.file[0];
      let uploadedPath = inputFile.path;
      let newPath = form.uploadDir + "/" + ((new Date()).toString().split(" ", 5)).toString().replace(/,/g, "-").replace(/:/g, "-") + inputFile.originalFilename;
      //同步重命名文件名 fs.renameSync(oldPath, newPath)
      fs.renameSync(uploadedPath, newPath);
      res.send({ data: "上传成功！" });
    } catch (err) {
      console.log(err);
      res.send({ err: "上传失败！" });
    };
  })
});

module.exports = upload;

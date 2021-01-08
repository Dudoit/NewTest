const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/heima', { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);
// 创建规则
const loggerSchema = new Schema({
  username: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now
  },
  handle: {
    type: String
  },
  test: {
    type: String
  }
});

// 导出模型构造函数
module.exports = mongoose.model('Logger', loggerSchema);

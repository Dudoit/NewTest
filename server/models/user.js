const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/heima', { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);
// 创建规则
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  recommendation: {
    type: String,
    required: true,
    fixed: 20170346125
  },
  created_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '../public/img/my.png'
  }
});

// 导出模型构造函数
module.exports = mongoose.model('User', userSchema);

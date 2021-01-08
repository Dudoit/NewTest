const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/heima', { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);
// 创建规则
const imgSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  classify: {
    type: String
  },
  images: {
    type: String
  },
  srcList: {
    type: [String]
  },
  describe: {
    type: String
  },
  answer: {
    type: String
  }
});

// 导出模型构造函数
module.exports = mongoose.model('Img', imgSchema);

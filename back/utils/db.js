const mongoose = require('mongoose')

//创建连接
mongoose.connect('mongodb://localhost/upload', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose
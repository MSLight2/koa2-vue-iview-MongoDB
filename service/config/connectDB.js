module.exports = () => {
  let mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/sapShop', {useNewUrlParser: true})
  let dbConnecion = mongoose.connection
  dbConnecion.once('open', function() {
    console.log('数据库连接成功！')
  });
  dbConnecion.on('error', console.error.bind(console, '连接失败~ . ~'));
}
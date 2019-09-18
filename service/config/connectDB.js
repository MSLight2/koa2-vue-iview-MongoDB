let dbCtrl = require('../controller/db')

module.exports = () => {
  let mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/sapShop', {useNewUrlParser: true})
  let dbConnecion = mongoose.connection
  dbConnecion.once('open', function() {
    console.log('数据库连接成功！')
    if (process.env.NODE_ENV === 'production') {
      dbCtrl.manyDataInsert[2]();
    }
  });
  dbConnecion.on('error', console.error.bind(console, '连接失败~ . ~'));
}
const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const app = new Koa()

let registerRouter = require('./middleware/registerRouter');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sapShop', {useNewUrlParser: true})
var dbConnecion = mongoose.connection
dbConnecion.once('open', function() {
  console.log('数据库连接成功！')
});
dbConnecion.on('error', console.error.bind(console, '连接失败~ . ~'));


app.use(bodyParser());
// 注册路由需放到bodyParser后面
app.use(registerRouter());
app.listen(3000, () => {
  console.log('demo has running in 3000 port')
})

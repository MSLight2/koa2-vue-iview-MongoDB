const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const app = new Koa()
let connectMongoDB = require('./config/connectDB');
let registerRouter = require('./middleware/registerRouter');

// 连接数据库
connectMongoDB();
app.use(bodyParser());
// 注册路由需放到bodyParser后面
app.use(registerRouter());
app.listen(3000, () => {
  console.log('demo has running in 3000 port')
})

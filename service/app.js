const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cros = require('koa2-cors');
const app = new Koa();
let connectMongoDB = require('./config/connectDB');
let registerRouter = require('./middleware/registerRouter');

// 连接数据库
connectMongoDB();
// 跨域
app.use(cros({
  origin: '*',
  maxAge: 3600,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(bodyParser());
// 注册路由需放到bodyParser后面
app.use(registerRouter());
app.listen(3000, () => {
  console.log('Service is already running on port 3000')
})

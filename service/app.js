const Koa = require('koa')
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa()

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sapShop', {useNewUrlParser: true})
var dbConnecion = mongoose.connection
dbConnecion.once('open', function() {
  console.log('数据库连接成功！')
});
db.on('error', console.error.bind(console, '连接失败~ . ~'));

var UsersModule = require('./module/login/Users');

router.get('/', async (ctx, next) => {
  ctx.body = 'hello koa2'
})

router.get('/user', async (ctx, next) => {
  ctx.body = {
    userName: 'caicai',
    age: '18'
  }
})

router.post('/login', async (ctx, next) => {
  let usersArr = []
  await UsersModule.find((err, users) => {
    if (err) return console.error(err);
    usersArr = users
  })
  ctx.body = usersArr
})


app.use(bodyParser());
app.use(router.routes());
app.listen(3000, () => {
  console.log('demo has running in 3000 port')
})

const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
  ctx.body = 'hello koa2'
})

app.listen(3000, () => {
  console.log('demo has running in 3000 port')
})
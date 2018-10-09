var UsersModule = require('../module/login/Users');

let homeRouter = async (ctx, next) => {
  ctx.body = 'home page';
}

let getUserInfo = async (ctx, next) => {
  ctx.body = {
    userName: 'caicai',
    age: '18'
  }
}

let login = async (ctx, next) => {
  let usersArr = []
  await UsersModule.find((err, users) => {
    if (err) return console.error(err);
    usersArr = users
  })
  ctx.body = usersArr
}

module.exports = {
  homeRouter: ['GET', '/', homeRouter],
  getUserInfo: ['GET', '/user', getUserInfo],
  login: ['POST', '/login', login]
}
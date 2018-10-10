let notFont = async (ctx, next) => {
  ctx.body = '404'
}

module.exports = {
  text: ['GET', '/404' , notFont]
}
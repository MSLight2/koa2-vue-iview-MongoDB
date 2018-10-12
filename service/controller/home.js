let homeRouter = async (ctx, next) => {
  ctx.body = 'home page';
}

module.exports = {
  text: ['GET', '/api/' , homeRouter]
}
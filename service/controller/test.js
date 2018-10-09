let test = async (ctx, next) => {
  ctx.body = 'text router'
}

module.exports = {
  text: ['GET', '/test' , test]
}
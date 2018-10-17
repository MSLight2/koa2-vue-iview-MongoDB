let addCollection = async (ctx) => {
  ctx.body = '404'
}

let deleteCollection = async (ctx) => {
  ctx.body = '404'
}

let getCollection = async (ctx) => {
  ctx.body = '404'
}

module.exports = {
  addCollection: ['GET', '/api/addCollection' , addCollection],
  deleteCollection: ['GET', '/api/deleteCollection' , deleteCollection],
  getCollection: ['GET', '/api/getCollection' , getCollection]
}
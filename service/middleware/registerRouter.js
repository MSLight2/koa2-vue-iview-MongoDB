const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

let controllerDir = path.join(__dirname, '../controller')
let files = fs.readdirSync(controllerDir);
// 过滤出.js文件
let jsFiles = files.filter((file) => {
  return file.endsWith('.js');
})
// 遍历文件
for (let f of jsFiles) {
  let expRouters = require(path.join(controllerDir, f));
  Object.values(expRouters).forEach((item) => {
    // item格式['req method', 'url', 'handle method']
    if (item[0].toUpperCase() === 'GET') {
      router.get(item[1], item[2]);
    } else if (item[0].toUpperCase() === 'POST') {
      router.post(item[1], item[2]);
    } else {
      router.get(item[1], ctx => {
        ctx.body = {errMsg: '路由配置错误'}
      });
    }
  });
}

module.exports = () => {
  return router.routes();
}
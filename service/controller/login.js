const Utils = require('../utils/utils');
const SecretConfig = require('../config/secretConfig');
const jwt = require('jsonwebtoken');
var UsersModule = require('../module/login/Users');

let homeRouter = async (ctx, next) => {
  ctx.body = 'home page';
}

/**
 * 
 * @param {用户名} userName
 * @param {用户id} id
 */
let getUserInfo = async (ctx, next) => {
  // TODO: 检验是否登录
  let userInfo = []
  let ctxQuery = ctx.query;
  let userName = ctxQuery.userName || '';
  let userId = ctxQuery.id || ''
  if (Utils.isEmpty(userName) || Utils.isEmpty(userId)) {
    ctx.body = {errMsg: '用户名和id是必须的'}
    return;
  }
  try {
    await UsersModule.findOne(
      {'name': userName, '_id': userId},
      null,
      (err, users) => {
        if (err) return console.error(err);
        userInfo = users
      }
    )
  } catch (error) {
    ctx.body = {errMsg: '查询出错'}
  }
  ctx.body = userInfo
}

/**
 * 登录接口：传入参数
 * @param {用户名} userName
 * @param {密码} password
 */
let login = async (ctx, next) => {
  let repData = {}
  let ctxReqBody = ctx.request.body;
  let userName = ctxReqBody.userName || '';
  let password = ctxReqBody.password || ''
  if (Utils.isEmpty(userName) || Utils.isEmpty(password)) {
    ctx.body = {errMsg: '用户名和密码是必须的'}
    return;
  }
  if (password.length < 6) {
    ctx.body = {errMsg: '密码长度不能小于6位数'}
    return;
  }
  try {
    await UsersModule.findOne(
      {'name': userName},
      null,
      (err, users) => {
        if (err) return console.error(err);
        usersArr = users
        repData = {
          dataInfo: users,
          token: jwt.sign({ userId: users['_id'] }, SecretConfig.secret, { expiresIn: '1h' })
        }
      }
    )
  } catch (error) {
    ctx.body = {errMsg: '查询出错'}
  }
  ctx.body = repData;
}

module.exports = {
  homeRouter: ['GET', '/', homeRouter],
  getUserInfo: ['GET', '/userInfo', getUserInfo],
  login: ['POST', '/login', login]
}
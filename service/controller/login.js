const Utils = require('../utils/utils');
const CryptoUtils = require('../utils/cryptoUtils');
const SecretConfig = require('../config/secretConfig');
const ErrCode = require('../config/errCode');
const jwt = require('jsonwebtoken');
var UsersModule = require('../module/login/Users');

let homeRouter = async (ctx, next) => {
  ctx.body = 'home page';
}

/**
 * 获取用户信息(用户id存于token中)
 * @param {用户名} userName
 * @param {用户id} id
 */
let getUserInfo = async (ctx, next) => {
  // 检验是否登录
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) {
    return ctx.body = validateTokenResult;
  };
  let repData = {};
  let ctxQuery = ctx.query;
  let userName = ctxQuery.userName || '';
  let userId = validateTokenResult.userId || '';
  if (Utils.isEmpty(userName) || Utils.isEmpty(userId)) {
    ctx.body = Utils.responseJSON({errMsg: '用户名和id是必须的'});
    return;
  }

  // 根据用户输入按 用户名/手机号码/邮箱 查询
  let sqlWhere = {'name': userName};
  if (Utils.isPhoneNumber(userName)) sqlWhere = {'phone': userName};
  if (Utils.isEmail(userName)) sqlWhere = {'email': userName};

  try {
    await UsersModule.findOne(sqlWhere, null, (err, users) => {
      if (err) {
        repData = {errMsg: '查询有误'};
        return;
      }
      let userInfo = {
        _id: users._id,
        name: users.name,
        age: users.age,
        sex: users.sex,
        email: users.email,
        address: users.address,
        nickName: users.nickName,
        birthday: users.birthday,
        phone: users.phone
      }
      repData = Utils.responseJSON({
        result: { dataInfo: userInfo },
        isSuccess: true
      })
    })
    ctx.body = repData;
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询出错'});
  }
}

/**
 * 登录接口：传入参数
 * @param {用户名} userName
 * @param {密码} password
 */
let login = async (ctx, next) => {
  let repData = {};
  let ctxReqBody = ctx.request.body;
  let userName = ctxReqBody.userName || '';
  let password = ctxReqBody.password || '';
  if (Utils.isEmpty(userName) || Utils.isEmpty(password)) {
    ctx.body = Utils.responseJSON({errMsg: '用户名和密码是必须的'});
    return;
  }
  if (password.length < 6) {
    ctx.body = Utils.responseJSON({errMsg: '密码长度不能小于6位数'});
    return;
  }
  // 根据用户输入按 用户名/手机号码/邮箱 查询
  let sqlWhere = {'name': userName};
  if (Utils.isPhoneNumber(userName)) sqlWhere = {'phone': userName};
  if (Utils.isEmail(userName)) sqlWhere = {'email': userName};

  try {
    // 查询
    await UsersModule.findOne(sqlWhere, null, (err, users) => {
      if (err) {
        repData = {errMsg: '查询有误'};
        return;
      }
      // 查询无误，校验是用户、密码是否正确
      if (users && userName === users[Object.keys(sqlWhere)[0]]
        && CryptoUtils.md5Encode(password) === users.password) {
        let userInfo = {
          _id: users._id,
          name: users.name,
          age: users.age,
          sex: users.sex,
          email: users.email,
          address: users.address,
          nickName: users.nickName,
          birthday: users.birthday,
          phone: users.phone
        }
        repData = Utils.responseJSON({
          result: {
            dataInfo: userInfo,
            token: jwt.sign({ userId: users['_id'] }, SecretConfig.secret, { expiresIn: '1h' })
          },
          isSuccess: true
        })
      } else {
        repData = Utils.responseJSON({errMsg: '用户名或密码错误'});
      }
    })
    ctx.body = repData;
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询出错'});
    repData = null;
  }
}

module.exports = {
  homeRouter: ['GET', '/', homeRouter],
  getUserInfo: ['GET', '/userInfo', getUserInfo],
  login: ['POST', '/login', login]
}
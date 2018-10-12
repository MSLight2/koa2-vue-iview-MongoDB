const Utils = require('../utils/utils');
const CryptoUtils = require('../utils/cryptoUtils');
const SecretConfig = require('../config/secretConfig');
const jwt = require('jsonwebtoken');
var UsersModule = require('../module/login/Users');

/**
 * 获取用户信息(用户id存于token中)
 * @method get
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
  let {userName = ''} = ctx.query;
  let {userId = ''} = validateTokenResult;
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
      } else {
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
      }
    })
    ctx.body = repData;
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询出错'});
  }
}

/**
 * 登录接口：传入参数
 * @method post
 * @param {用户名} userName
 * @param {密码} password
 */
let login = async (ctx, next) => {
  let repData = {};
  let {userName = '', password = ''} = ctx.request.body;
  if (Utils.isEmpty(userName) || Utils.isEmpty(password)) {
    ctx.body = Utils.responseJSON({errMsg: '用户名和密码是必须的'});
    return;
  }
  // 根据用户输入按 用户名/手机号码/邮箱 查询
  let sqlWhere = {'name': userName};
  if (Utils.isPhoneNumber(userName)) sqlWhere = {'phone': userName};
  if (Utils.isEmail(userName)) sqlWhere = {'email': userName};

  try {
    // 查询
    let users = await UsersModule.findOne(sqlWhere, null);
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
    ctx.body = repData;
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询出错'});
    repData = null;
  }
}

/**
 * 用户注册
 * @method post
 * @param {用户名} userName
 * @param {昵称} nickName
 * @param {密码} password
 * @param {确认密码} passwordAgian
 */
let regist = async (ctx) => {
  let registType = 'phone';
  let {userName = '', nickName = '', password = '', passwordAgian = ''} = ctx.request.body;
  if (Utils.isEmpty(userName) || Utils.isEmpty(nickName) || Utils.isEmpty(password)|| Utils.isEmpty(passwordAgian)) {
    ctx.body = Utils.responseJSON({errMsg: '用户名、呢城和密码是必须的'});
    return;
  }
  if (password !== passwordAgian) {
    ctx.body = Utils.responseJSON({errMsg: '输入的密码不一致'});
    return;
  }
  if (!Utils.isPhoneNumber(userName) && !Utils.isEmail(userName)) {
    ctx.body = Utils.responseJSON({errMsg: '用户名只能是手机号或邮箱'});
    return;
  }
  if (Utils.isEmail(userName)) registType = 'email';

  try {
    // 注册前判断此用户是否存在
    let sqlWhere = {'name': userName};
    if (Utils.isPhoneNumber(userName)) sqlWhere = {'phone': userName};
    if (Utils.isEmail(userName)) sqlWhere = {'email': userName};
    let users = await UsersModule.findOne(sqlWhere, null);
    if (users) {
      ctx.body = Utils.responseJSON({errMsg: '此用户已存在'});
      return;
    }
    // 注册
    let Users = new UsersModule({
      name: nickName,
      age: '',
      sex: -1,
      email: registType === 'email' ? userName : '',
      address: '',
      nickName: nickName,
      birthday: '',
      phone: registType === 'phone' ? userName : '',
      password: CryptoUtils.md5Encode(password),
      isDelete: false
    })
    await Users.save();
    ctx.body = Utils.responseJSON({
      result: '注册成功',
      isSuccess: true
    });
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '插入数据出错'});
    repData = null;
  }
}

/**
 * 忘记密码：密码重置
 * @method post
 * @param {用户名} userName
 * @param {密码} password
 * @param {确认密码} passwordAgian
 */
let resetPassword = async (ctx) => {
  let repDate = {};
  let {userName = '', password = '', passwordAgian = ''} = ctx.request.body;
  if (Utils.isEmpty(userName) || Utils.isEmpty(password)|| Utils.isEmpty(passwordAgian)) {
    ctx.body = Utils.responseJSON({errMsg: '用户名和密码是必须的'});
    return;
  }
  if (password !== passwordAgian) {
    ctx.body = Utils.responseJSON({errMsg: '输入的密码不一致'});
    return;
  }

  let updateWhere = {'phone': userName};
  let updateValue = {$set: { 'password': CryptoUtils.md5Encode(password) }};
  if (Utils.isEmail(userName)) updateWhere = {'email': userName};

  try {
    // 重置用户是否存在
    let sqlWhere = {'phone': userName};
    if (Utils.isEmail(userName)) sqlWhere = {'email': userName};
    let users = await UsersModule.findOne(sqlWhere, null);
    if (!users) {
      ctx.body = Utils.responseJSON({errMsg: '此用户已不存在'});
      return;
    }
    // 重置
    let doc = await UsersModule.updateOne(updateWhere, updateValue);
    if (doc.n) {
      repDate = Utils.responseJSON({
        result: '密码重置成功',
        isSuccess: true
      })
    } else {
      repDate = Utils.responseJSON({errMsg: '密码重置失败，请输入手机号或邮箱'})
    }
    ctx.body = repDate;
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '更新数据出错'});
    repData = null;
  }
}

module.exports = {
  getUserInfo: ['GET', '/api/userInfo', getUserInfo],
  login: ['POST', '/api/login', login],
  regist: ['POST', '/api/regist', regist],
  resetPassword: ['POST', '/api/resetPassword', resetPassword]
}
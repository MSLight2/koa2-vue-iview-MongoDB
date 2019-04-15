const Utils = require('../utils/utils');
const CryptoUtils = require('../utils/cryptoUtils');
const SecretConfig = require('../config/secretConfig');
const Code = require('../config/errCode');
const jwt = require('jsonwebtoken');
var UsersModule = require('../module/login/Users');

/**
 * 获取用户信息(用户id存于token中)
 * @method get
 * @param {用户id（无需传入，通过解析token获取）} id
 */
let getUserInfo = async (ctx, next) => {
  // 检验是否登录
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});
  
  try {
    let sqlWhere = {'_id': userId};
    let users = await UsersModule.findById(sqlWhere, {'_id': 0, 'isDelete': 0});
    ctx.body = Utils.responseJSON({
      result: { dataInfo: users },
      isSuccess: true,
      code: Code.successCode
    });
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询数据出错', code: Code.dbErr});
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
    return ctx.body = Utils.responseJSON({errMsg: '用户名和密码是必须的'});
  }
  // 根据用户输入按 用户名/手机号码/邮箱 查询
  let sqlWhere = {'name': userName};
  if (Utils.isPhoneNumber(userName)) sqlWhere = {'phone': userName};
  if (Utils.isEmail(userName)) sqlWhere = {'email': userName};

  try {
    // 查询
    let users = await UsersModule.findOne(sqlWhere, null);
    // 未注册
    if (!users) return ctx.body = Utils.responseJSON({errMsg: '此用户未注册', code: Code.noRegister});
    // 查询无误，校验是用户、密码是否正确
    if (users && userName === users[Object.keys(sqlWhere)[0]]
      && CryptoUtils.md5Encode(password) === users.password) {
      repData = Utils.responseJSON({
        result: {
          token: jwt.sign(
            { userId: users['_id'] },
            SecretConfig.secret,
            { expiresIn: SecretConfig.tokenExpire }
          )
        },
        isSuccess: true,
        code: Code.successCode
      })
    } else {
      repData = Utils.responseJSON({errMsg: '用户名或密码错误', code: Code.loginFail});
    }
    ctx.body = repData;
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询数据出错', code: Code.dbErr});
    repData = null;
  }
}

/**
 * 登出
 */
let loginOut = async (ctx) => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  try {
    ctx.body = Utils.responseJSON({
      result: {
        token: jwt.sign(
          { userId: userId },
          SecretConfig.secret,
          { expiresIn: '120ms' }
        )
      },
      isSuccess: true,
      code: Code.successCode
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询数据出错', code: Code.dbErr});
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
    return ctx.body = Utils.responseJSON({errMsg: '用户名、呢城和密码是必须的'});
  }
  if (password !== passwordAgian) return ctx.body = Utils.responseJSON({errMsg: '输入的密码不一致'});
  if (!Utils.isPhoneNumber(userName) && !Utils.isEmail(userName)) {
    return ctx.body = Utils.responseJSON({errMsg: '用户名只能是手机号或邮箱'});
  }
  if (Utils.isEmail(userName)) registType = 'email';

  try {
    // 注册前判断此用户是否存在
    let sqlWhere = {'name': userName};
    if (Utils.isPhoneNumber(userName)) sqlWhere = {'phone': userName};
    if (Utils.isEmail(userName)) sqlWhere = {'email': userName};
    let users = await UsersModule.findOne(sqlWhere, null);
    if (users) return ctx.body = Utils.responseJSON({errMsg: '此用户已存在'});

    // 注册
    let Users = new UsersModule({
      name: nickName,
      age: 0,
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
      isSuccess: true,
      code: Code.successCode
    });
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '插入数据出错', code: Code.dbErr});
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
    return ctx.body = Utils.responseJSON({errMsg: '用户名和密码是必须的'});
  }
  if (password !== passwordAgian) return ctx.body = Utils.responseJSON({errMsg: '输入的密码不一致'});

  let updateWhere = {'phone': userName};
  let updateValue = {$set: { 'password': CryptoUtils.md5Encode(password) }};
  if (Utils.isEmail(userName)) updateWhere = {'email': userName};

  try {
    // 重置用户是否存在
    let users = await UsersModule.findOne(updateWhere, null);
    if (!users) return ctx.body = Utils.responseJSON({errMsg: '此用户不存在', code: Code.noRegister});
    // 重置
    let doc = await UsersModule.updateOne(updateWhere, updateValue);
    if (doc.n) {
      repDate = Utils.responseJSON({
        result: '密码重置成功',
        isSuccess: true,
        code: Code.successCode
      })
    } else {
      repDate = Utils.responseJSON({errMsg: '密码重置失败，请输入手机号或邮箱'})
    }
    ctx.body = repDate;
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '更新数据出错', code: Code.dbErr});
    repData = null;
  }
}

/**
 * 编辑用户信息
 * @method post
 * @param {姓名} name
 * @param {昵称} nickName
 * @param {年龄} age
 * @param {性别} sex
 * @param {邮箱} email
 * @param {地址} address
 * @param {生日} birthday
 * @param {电话} phone
 * @param {座右铭} motto 非必传
 */
let editUserInfo = async (ctx) => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  try {
    let {
      name = '',
      nickName = '',
      age = 0,
      sex = 0,
      email = '',
      address = '',
      birthday = '',
      phone = '',
      motto = ''
    } = ctx.request.body;
    if (!name || !nickName || !age || !email || !address || !birthday || !phone) {
      return ctx.body = Utils.responseJSON({errMsg: '缺少必传字段'});
    }
    if (!Utils.isPhoneNumber(phone)) {
      return ctx.body = Utils.responseJSON({errMsg: '手机号码格式不正确'});
    }
    if (!Utils.isEmail(email)) {
      return ctx.body = Utils.responseJSON({errMsg: '邮箱地址格式不正确'});
    }
    let updateWhere = {
      'name': name,
      'nickName': nickName,
      'age': parseInt(age) || 0,
      'sex': parseInt(sex) || 0,
      'email': email,
      'address': address,
      'birthday': birthday,
      'phone': phone
    };
    if (motto) updateWhere['motto'] = motto
    let doc = await UsersModule.findOneAndUpdate({'_id': userId}, {$set: updateWhere});
    if (!doc) return ctx.body = Utils.responseJSON({errMsg: '改用户不存在'});
    ctx.body = Utils.responseJSON({
      result: '用户信息已更新',
      isSuccess: true,
      code: Code.successCode
    });
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '更新数据出错', code: Code.dbErr});
  }
}

/**
 * 编辑座右铭
 * @method post
 * @param {座右铭} motto
 */
let editUserMotto = async (ctx) => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  try {
    let { motto = '' } = ctx.request.body;
    if (!motto) return ctx.body = Utils.responseJSON({errMsg: '座右铭字段是必须的'});
    let doc = await UsersModule.findOneAndUpdate({'_id': userId}, {$set: {'motto': motto}});
    if (!doc) if (!doc) return ctx.body = Utils.responseJSON({errMsg: '改用户不存在'});
    ctx.body = Utils.responseJSON({
      result: '座右铭已更新',
      isSuccess: true,
      code: Code.successCode
    });
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '更新数据出错', code: Code.dbErr});
  }
}

module.exports = {
  getUserInfo: ['GET', '/api/userInfo', getUserInfo],
  login: ['POST', '/api/login', login],
  loginOut: ['POST', '/api/loginOut', loginOut],
  regist: ['POST', '/api/regist', regist],
  resetPassword: ['POST', '/api/resetPassword', resetPassword],
  editUserInfo: ['POST', '/api/editUserInfo', editUserInfo],
  editUserMotto: ['POST', '/api/editUserMotto', editUserMotto]
}
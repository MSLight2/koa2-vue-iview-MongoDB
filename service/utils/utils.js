const jwt = require('jsonwebtoken');
const SecretConfig = require('../config/secretConfig');
const ErrCode = require('../config/errCode');

let isEmpty = (val) => {
  val = val.trim();
  if (val === null || val === '' || val.length <= 0 || val === undefined) {
    return true;
  } else {
    return false;
  }
}

let isEmail = (val) => {
  if (/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/g.test(val)) {
    return true;
  } else {
    return false;
  }
}

let isPhoneNumber = (val) => {
  if (/^1[34578][0-9]{9}$/g.test(val)) {
    return true;
  } else {
    return false;
  }
}

let responseJSON = ({result, code, isSuccess, errMsg}) => {
  return {
    result: result || '',
    errMsg: errMsg || '',
    code: code || ErrCode.validateErrCode,
    isSuccess: isSuccess || ''
  };
}

let repPagination = ({page = 1, pageSize = 10, total = 0}) => {
  return {
    paginationModule: {
      page: Number(page),
      pageSize: Number(pageSize),
      pageCount: Math.ceil(total / pageSize),
      total: total
    }
  };
}

/**
 * 生成唯一的订单号
 * @param {商品id} goodsId
 */
let createUniqueOrderNumber = (goodsId) => {
  return new Date().getTime() + goodsId + Math.random().toFixed(3) * 1000
}

/**
 * 解析token
 * @returns {0} 传入token格式有误
 * @returns {-1} 无token，未注册
 * @returns {-2}  token过期
 */
let resolveAuthorizationHeader = (ctx) => {
  let decodedToken = 0;
  if (!ctx.header || !ctx.header.authorization) {
    return decodedToken = -1;
  }
  let headerToken = ctx.header.authorization.split(' ');
  if (headerToken.length === 2) {
    let scheme = headerToken[0];
    let token = headerToken[1];
    if (/^Bearer$/g.test(scheme)) {
      jwt.verify(token, SecretConfig.secret, function(err, decoded) {
        if (err) {
          decodedToken = -2
        } else {
          decodedToken = decoded
        }
      });
    }
  }
  return decodedToken;
}

/**
 * 检验token
 */
let validateToken = (ctx) => {
  let decodeToken = resolveAuthorizationHeader(ctx);
  if (decodeToken === 0) {
    return responseJSON({errMsg: 'token格式错误', code: ErrCode.errToken});
  }
  if (decodeToken == -1) {
    return responseJSON({errMsg: '请传入token', code: ErrCode.noToken});
  }
  if (decodeToken == -2) {
    return responseJSON({errMsg: 'token已过期', code: ErrCode.tokenExpire});
  }
  return decodeToken;
}

module.exports = {
  isEmpty: isEmpty,
  isEmail: isEmail,
  isPhoneNumber: isPhoneNumber,
  responseJSON: responseJSON,
  repPagination: repPagination,
  resolveAuthorizationHeader: resolveAuthorizationHeader,
  validateToken: validateToken,
  createUniqueOrderNumber: createUniqueOrderNumber
}
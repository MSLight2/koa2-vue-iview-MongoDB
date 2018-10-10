const jwt = require('jsonwebtoken');
const SecretConfig = require('../config/secretConfig');

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

let responseJSON = ({result, statusCode, isSuccess, errMsg}) => {
  return {
    result: result || '',
    errMsg: errMsg || '',
    statusCode: statusCode || '',
    isSuccess: isSuccess || ''
  };
}

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
        decodedToken = decoded
      });
    }
  }
  return decodedToken;
}

module.exports = {
  isEmpty: isEmpty,
  isEmail: isEmail,
  isPhoneNumber: isPhoneNumber,
  responseJSON: responseJSON,
  resolveAuthorizationHeader: resolveAuthorizationHeader
}
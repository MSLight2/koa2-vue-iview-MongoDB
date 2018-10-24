let AddressModule = require('../module/Address');
let Utils = require('../utils/utils');
let Code = require('../config/errCode');

/**
 * 获取用户收货地址
 * @method get
 * @param {用户id} userId
 */
let getAddressList = async ctx => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  try {
    let addresses = await AddressModule.find({'userId': userId}, null);
    ctx.body = Utils.responseJSON({
      result: addresses,
      isSuccess: true,
      code: Code.successCode
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询数据出错', code: Code.dbErr});
  }
}

/**
 * 添加收货地址
 * @method post
 * @param {用户id} userId
 * @param {邮箱地址} email
 * @param {详细地址} detailAddress
 * @param {城市} city
 * @param {手机号} phone
 * @param {是否为默认地址} isDefault
 */
let addAddress = async ctx => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  let {
    email = '',
    detailAddress = '',
    city = '',
    phone = '',
    isDefault = false
  } = ctx.request.body;

  if (!Utils.isEmail(email)) return ctx.body = Utils.responseJSON({errMsg: '邮箱地址格式不正确'});
  if (!Utils.isPhoneNumber(phone)) return ctx.body = Utils.responseJSON({errMsg: '手机号码格式不正确'});
  if (!detailAddress || !city) return ctx.body = Utils.responseJSON({errMsg: '城市或详细地址不能为空'});

  try {
    let address = new AddressModule({
      userId: userId,
      email: email,
      detailAddress: detailAddress,
      city: city,
      phone: phone,
      isDefault: isDefault || false,
    });
    await address.save();
    ctx.body = Utils.responseJSON({
      result: '地址添加成功',
      isSuccess: true,
      code: Code.successCode
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '添加地址出错', code: Code.dbErr});
  }
}

/**
 * 编辑收货地址
 * @method post
 * @param {用户id} userId
 * @param {地址id} addressId
 * @param {邮箱地址} email
 * @param {详细地址} detailAddress
 * @param {城市} city
 * @param {手机号} phone
 * @param {是否为默认地址} isDefault
 */
let editAddress = async ctx => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  let {
    email = '',
    addressId = '',
    detailAddress = '',
    city = '',
    phone = '',
    isDefault = false
  } = ctx.request.body;
  let updateOption = {};
  if (!addressId) return ctx.body = Utils.responseJSON({errMsg: '地址id是必须的'});
  if (email) {
    if (Utils.isEmail(email)) {
      updateOption['email'] = email;
    } else {
      return ctx.body = Utils.responseJSON({errMsg: '邮箱地址格式不正确'});
    }
  }
  if (phone) {
    if (Utils.isPhoneNumber(phone)) {
      updateOption['phone'] = phone;
    } else {
      return ctx.body = Utils.responseJSON({errMsg: '手机号码格式不正确'});
    }
  }
  if (city) updateOption['city'] = city;
  if (detailAddress) updateOption['detailAddress'] = detailAddress;
  
  try {
    // 设置为默认地址的另外处理
    if (isDefault) {
      await AddressModule.updateMany({'isDefault': true}, {$set: {'isDefault': false}}).exec();
      updateOption['isDefault'] = isDefault;
    }

    let doc = await AddressModule.findByIdAndUpdate({'_id': addressId}, {$set: updateOption});
    if (!doc) return ctx.body = Utils.responseJSON({errMsg: '改地址不存在'});
    ctx.body = Utils.responseJSON({
      result: '地址已更新',
      isSuccess: true,
      code: Code.successCode
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '更新地址出错', code: Code.dbErr});
  }
}

/**
 * 删除收货地址
 * @method post
 * @param {用户id} userId
 * @param {地址id} addressId
 */
let deleteAddress = async ctx => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  let {addressId = ''} = ctx.request.body;
  if (!addressId) return ctx.body = Utils.responseJSON({errMsg: '地址id是必须的'});

  try {
    let doc = await AddressModule.findByIdAndDelete({'_id': addressId});
    if (!doc) return ctx.body = Utils.responseJSON({errMsg: '该条数据不存在'});
    ctx.body = Utils.responseJSON({
      result: '删除成功',
      isSuccess: true,
      code: Code.successCode
    })
  } catch (error) {
    console.log(error)
    ctx.body = Utils.responseJSON({errMsg: '删除数据出错', code: Code.dbErr});
  }
}

module.exports = {
  getAddressList: ['GET', '/api/getAddressList' , getAddressList],
  addAddress: ['POST', '/api/addAddress' , addAddress],
  editAddress: ['POST', '/api/editAddress' , editAddress],
  deleteAddress: ['POST', '/api/deleteAddress' , deleteAddress]
}
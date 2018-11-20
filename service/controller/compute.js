let CollectionModule = require('../module/Collection');
let ShopCartModule = require('../module/shopCart/ShopCart');
let Utils = require('../utils/utils');
let Code = require('../config/errCode');

/**
 * 统计数量获取
 * @method get
 * @param {用户id} userId 
 */
let getCount = async ctx => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  let sqlWhere = {'userId': userId};

  try {

    let collectionCount = CollectionModule.find(sqlWhere).count();
    let shopCartCount = ShopCartModule.find(sqlWhere).count();

    ctx.body = {
      collectionCount: collectionCount,
      shopCartCount: shopCartCount,
      isSuccess: true,
      code: Code.successCode
    }
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询出错', code: Code.dbErr});
  }
}

module.exports = {
  getCount: ['GET', '/api/getCount' , getCount]
}
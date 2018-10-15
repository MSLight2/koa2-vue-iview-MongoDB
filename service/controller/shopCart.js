let Utils = require('../utils/utils');
let ShopCartModule = require('../module/shopCart/ShopCart');

/**
 * 购物车数据获取
 * @method get
 * @param {用户id} userId 
 */
let getShoppingCart = async (ctx) => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) {
    return ctx.body = validateTokenResult;
  };
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) {
    ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});
    return;
  }

  let sqlWhere = {'userId': userId};
  
  try {
    let shopCarts = await ShopCartModule.findOne(sqlWhere,
      'userId goodsId number status create_time update_time');

    ctx.body = Utils.responseJSON({
      result: { dataInfo: shopCarts },
      isSuccess: true
    })    
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '购物车查询出错'});
  }
}

module.exports = {
  getShoppingCart: ['GET', '/api/shopCart' , getShoppingCart]
}
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

/**
 * 添加/编辑 购物车
 * @method post
 * @param {用户id}  userId
 * @param {商品id}  goodsId
 * @param {商品数量}  goodsNum
 * @param {是否为编辑}  isEdit
 */
let addShoppingCart = async (ctx) => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) {
    return ctx.body = validateTokenResult;
  };
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) {
    ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});
    return;
  }

  let {goodsId = '', goodsNum = ''} = ctx.request.body;
  if (!userId || !goodsId || !goodsNum) {
    ctx.body = Utils.responseJSON({errMsg: '参数错误'});
    return;
  }
  try {
    let shopItem = new ShopCartModule({
      userId: userId,
      goodsId: goodsId,
      number: goodsNum,
      status: 1,
      create_time: new Date().getTime(),
      update_time: new Date().getTime()
    });
    await shopItem.save();
    ctx.body = Utils.responseJSON({
      result: '添加购物车成功',
      isSuccess: true
    });
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '插入数据出错'});
  }
}

/**
 * 删除购物车
 * @param {用户id} userId 
 * @param {商品id} goodsId 
 */
let deleteShopCart = async (ctx) => {
}
module.exports = {
  getShoppingCart: ['GET', '/api/getShopCart' , getShoppingCart],
  addShoppingCart: ['POST', '/api/addShopCart' , addShoppingCart]
}
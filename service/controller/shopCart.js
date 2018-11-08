let Utils = require('../utils/utils');
let ShopCartModule = require('../module/shopCart/ShopCart');
let GoodsModule = require('../module/goods/Goods');
let Code = require('../config/errCode');

/**
 * 购物车数据获取
 * @method get
 * @param {用户id} userId 
 */
let getShoppingCart = async (ctx) => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  let sqlWhere = {'userId': userId};
  
  try {
    let shopCarts = await ShopCartModule.find(sqlWhere);
    // let goodsIds = [];
    // shopCarts.forEach(item => {
    //   goodsIds.push(item.goodsId)
    // })
    // let goodsDate = await GoodsModule.find({'goodsId': { '$in': goodsIds } },
    //   'goodsType title showPrice mainPicPath')

    ctx.body = Utils.responseJSON({
      result: shopCarts,
      isSuccess: true,
      code: Code.successCode
    })
  } catch (error) {
    console.log(error)
    ctx.body = Utils.responseJSON({errMsg: '购物车查询出错', code: Code.dbErr});
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
let addAndEditShoppingCart = async (ctx) => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  let {goodsId = '', goodsNum = '', isEdit = false} = ctx.request.body;
  if (!userId || !goodsId || !goodsNum) return ctx.body = Utils.responseJSON({errMsg: '参数错误'})

  try {
    let sqlWhere = {'userId': userId, 'goodsId': goodsId};
    let user = await ShopCartModule.findOne(sqlWhere, null);

    if (isEdit) {
      // 编辑
      if (!user) return ctx.body = Utils.responseJSON({errMsg: '此用户不存在'});
      await ShopCartModule.updateOne(sqlWhere, {$set: {'number': goodsNum}}, null);
      ctx.body = Utils.responseJSON({
        result: '编辑购物车成功',
        isSuccess: true
      });
    }
    if (!isEdit && user) {
      // 不是编辑，但数据库已有此条数据
      await ShopCartModule.updateOne(sqlWhere, {$inc: {'number': goodsNum}}, null);
      ctx.body = Utils.responseJSON({
        result: '编辑购物车成功',
        isSuccess: true
      });
    }
    if (!isEdit && !user) {
      // 添加
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
        isSuccess: true,
        code: Code.successCode
      });
    }
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '插入数据出错', code: Code.dbErr});
  }
}

/**
 * 删除购物车
 * @method post
 * @param {用户id} userId 
 * @param {商品id} goodsId 
 */
let deleteShoppingCart = async (ctx) => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) {
    return ctx.body = validateTokenResult;
  };
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) {
    ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});
    return;
  }

  let {goodsId = ''} = ctx.request.body;
  if (!goodsId) {
    ctx.body = Utils.responseJSON({errMsg: '参数错误'});
    return;
  }

  try {
    let sqlWhere = {'userId': userId, 'goodsId': goodsId};
    let user = await ShopCartModule.findOne(sqlWhere, null);
    if (!user) {
      ctx.body = Utils.responseJSON({errMsg: '此用户不存在'});
      return;
    }
    await ShopCartModule.deleteOne(sqlWhere);
    ctx.body = Utils.responseJSON({
      result: '删除购物车成功',
      isSuccess: true,
      code: Code.successCode
    });
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '删除数据出错', code: dbErr});
  }
}

module.exports = {
  getShoppingCart: ['GET', '/api/getShopCart' , getShoppingCart],
  addAndEditShoppingCart: ['POST', '/api/addAndEditShopCart' , addAndEditShoppingCart],
  deleteShoppingCart: ['POST', '/api/deleteShopCart' , deleteShoppingCart]
}
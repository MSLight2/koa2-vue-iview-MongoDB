let CollectionModule = require('../module/Collection');
let Utils = require('../utils/utils');
let Code = require('../config/errCode');

/**
 * 添加收藏
 * @method post
 * @param {用户id} userId
 * @param {商品id} goodsId
 */
let addCollection = async (ctx) => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});
  
  let {goodsId = ''} = ctx.request.body;
  if (!goodsId) return ctx.body = Utils.responseJSON({errMsg: '参数错误'});

  try {
    let collection = new CollectionModule({
      userId: userId,
      goodsId: goodsId,
      collectionTime: new Date().getTime()
    })
    await collection.save();
    ctx.body = Utils.responseJSON({
      result: '添加收藏成功',
      isSuccess: true,
      code: Code.successCode
    });
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '插入数据出错', code: Code.dbErr});
  }
}

/**
 * 删除收藏
 * @method post
 * @param {用户id} userId
 * @param {商品id} goodsId
 */
let deleteCollection = async (ctx) => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});
  
  let {goodsId = ''} = ctx.request.body;
  if (!goodsId) return ctx.body = Utils.responseJSON({errMsg: '参数错误'});

  try {
    let sqlWhere = {'userId': userId, 'goodsId': goodsId};
    let del = await CollectionModule.deleteOne(sqlWhere);
    if (!del.n) return  ctx.body = Utils.responseJSON({errMsg: '无此条数据'});
    ctx.body = Utils.responseJSON({
      result: '删除收藏成功',
      isSuccess: true,
      code: Code.successCode
    });
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '删除数据出错', code: Code.dbErr});
  }
}

/**
 * 获取我的收藏
 * @method get
 * @param {用户id} userId
 */
let getCollection = async (ctx) => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  try {
    let collections = await CollectionModule.find({'userId': userId});
    ctx.body = Utils.responseJSON({
      result: collections,
      isSuccess: true,
      code: Code.successCode
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询数据出错', code: Code.dbErr})
  }
}

module.exports = {
  addCollection: ['POST', '/api/addCollection' , addCollection],
  deleteCollection: ['POST', '/api/deleteCollection' , deleteCollection],
  getCollection: ['GET', '/api/getCollection' , getCollection]
}
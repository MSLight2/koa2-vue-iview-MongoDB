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
    let collectioned = await CollectionModule.findOne({'userId': userId, 'goodsId': goodsId})
    if (collectioned) return ctx.body = Utils.responseJSON({errMsg: '这个商品你已经收藏过啦'});
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
 * @param {查询页数} page
 * @param {返回行数} pageSize
 */
let getCollection = async (ctx) => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  let {
    page = 1,
    pageSize = 18
  } = ctx.query;
  let pageskip = page ? parseInt(page) - 1 : 0;
  if (pageskip < 0) pageskip = 0;
  pageSize = pageSize ? parseInt(pageSize) : 18;
  let skipCount = pageskip * pageSize;

  try {
    let collections = await CollectionModule.aggregate([
      {
        $match: {'userId': userId}
      },
      {
        $lookup:
          {
            from: "goods",
            localField: "goodsId",
            foreignField: "goodsId",
            as: "goodsId_docs"
          }
      },
      // 查询结果不显示的项
      {
        $project:
          {
            _id: 0,
            'goodsId_docs._id': 0,
            'goodsId_docs.quantity': 0,
            'goodsId_docs.originalPrice': 0,
            'goodsId_docs.sold': 0,
            'goodsId_docs.goodRate': 0,
            'goodsId_docs.location': 0
          }
      }
    ])
    .skip(skipCount)
    .limit(pageSize)
    .exec();
    let goodsCount = await CollectionModule.find({'userId': userId}).count();

    ctx.body = {
      ...Utils.responseJSON({
        result: collections,
        isSuccess: true,
        code: Code.successCode
      }),
      ...Utils.repPagination({
        page: page,
        pageSize: pageSize,
        total: goodsCount
      })
    }
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询数据出错', code: Code.dbErr})
  }
}

module.exports = {
  addCollection: ['POST', '/api/addCollection' , addCollection],
  deleteCollection: ['POST', '/api/deleteCollection' , deleteCollection],
  getCollection: ['GET', '/api/getCollection' , getCollection]
}
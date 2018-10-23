let EvaluateModule = require('../module/Evaluate');
let Utils = require('../utils/utils.js');

/**
 * 获取评价内容
 * @method get
 * @param {商品id} goodsId
 */
let getEvaluateList = async ctx => {
  let {goodsId = ''} = ctx.query;
  if (!goodsId) return ctx.body = Utils.responseJSON({errMsg: '商品id是必须的'});

  try {
    let evaluates = await EvaluateModule.find({'goodsId': goodsId}, null);
    ctx.body = Utils.responseJSON({
      result: evaluates,
      isSuccess: true
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询评论出错'});
  }
}

/**
 * 添加评论
 * @method post
 * @param {用户id} userId
 * @param {商品id} goodsId
 * @param {昵称} nickName
 * @param {邮箱} email
 * @param {评论} review
 * @param {评分} rate
 */
let addEvaluate = async ctx => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  let {goodsId = '', nickName = '', email = '', review = '', rate = ''} = ctx.request.body;
  if (!goodsId) return ctx.body = Utils.responseJSON({errMsg: '商品id是必须的'});
  if (!nickName) return ctx.body = Utils.responseJSON({errMsg: '昵称是必须的'});
  if (!email) return ctx.body = Utils.responseJSON({errMsg: '邮箱是必须的'});
  if (!review) return ctx.body = Utils.responseJSON({errMsg: '评价是必须的'});
  if (!rate) return ctx.body = Utils.responseJSON({errMsg: '评分是必须的'});

  try {
    let evaluated = await EvaluateModule.findOne({'userId': userId, 'goodsId': goodsId}, null);
    if (evaluated) return ctx.body = Utils.responseJSON({errMsg: '你已评论过该商品，不能重复评论'});

    let evaluate = new EvaluateModule({
      userId: userId,
      goodsId: goodsId,
      createTime: new Date().getTime(),
      nickName: nickName,
      email: email,
      review: review,
      rate: rate
    });
    await evaluate.save();
    ctx.body = Utils.responseJSON({
      result: '评论成功',
      isSuccess: true
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '添加评论出错'});
  }
}

/**
 * 删除评论
 * @method post
 * @param {用户id} userId
 * @param {商品id} goodsId
 */
let deleteEvaluate = async ctx => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  let {goodsId = ''} = ctx.request.body;
  if (!goodsId) return ctx.body = Utils.responseJSON({errMsg: '商品id是必须的'});

  try {
    let doc = await EvaluateModule.deleteOne({'userId': userId, 'goodsId': goodsId});
    if (!doc.n) return ctx.body = Utils.responseJSON({errMsg: '该评论不存在'});
    ctx.body = Utils.responseJSON({
      result: '删除评论成功',
      isSuccess: true
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '删除评论出错'});
  }
}

module.exports = {
  getEvaluateList: ['GET', '/api/getEvaluateList' , getEvaluateList],
  addEvaluate: ['POST', '/api/addEvaluate' , addEvaluate],
  deleteEvaluate: ['POST', '/api/deleteEvaluate' , deleteEvaluate]
}
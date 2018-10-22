let EvaluateModule = require('../module/Evaluate');
let Utils = require('../utils/utils.js');

/**
 * 获取评价内容
 * @method get
 * @param {商品id} goodsId
 */
let getEvaluateList = async ctx => {
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
    let doc = EvaluateModule.deleteOne({'userId': userId, 'goodsId': goodsId});
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
  addEvaluate: ['GET', '/api/addEvaluate' , addEvaluate],
  deleteEvaluate: ['GET', '/api/deleteEvaluate' , deleteEvaluate]
}
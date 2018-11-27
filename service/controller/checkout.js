let CheckoutModule = require('../module/checkout/Checkout');
let ShopCartModule = require('../module/shopCart/ShopCart');
let Utils = require('../utils/utils');
let Code = require('../config/errCode');

/**
 * 获取未支付订单
 * @method get
 * @param {用户id} userId
 */
let getCheckoutList = async ctx => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  try {
    let checkouts = await CheckoutModule.aggregate([
      {
        $match: {'userId': userId, 'payStatus': {'$lte': 1}}
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
            'goodsId_docs.discountPrice': 0,
            'goodsId_docs.originalPrice': 0,
            'goodsId_docs.sold': 0
          }
      }   
    ]).exec();
    if (!checkouts) return ctx.body = Utils.responseJSON({errMsg: '此用户无订单数据'});

    ctx.body = Utils.responseJSON({
      result: checkouts,
      isSuccess: true,
      code: Code.successCode
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询数据出错', code: Code.dbErr});
  }
}

/**
 * 获取已支付订单
 * @method get
 * @param {用户id} userId
 */
let getPayCheckoutList = async ctx => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  try {
    let checkouts = await CheckoutModule.aggregate([
      {
        $match: {'userId': userId, 'payStatus': {'$gte': 2}}
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
            'goodsId_docs.discountPrice': 0,
            'goodsId_docs.originalPrice': 0,
            'goodsId_docs.sold': 0,
            'userId': 0
          }
      }   
    ]).exec();
    if (!checkouts) return ctx.body = Utils.responseJSON({errMsg: '此用户无订单数据'});

    ctx.body = Utils.responseJSON({
      result: checkouts,
      isSuccess: true,
      code: Code.successCode
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询数据出错', code: Code.dbErr});
  }
}

/**
 * 生成订单
 * @method post
 * @param {用户id} userId
 * @param {商品购物列表} goodsCartList
 */
let addCheckout = async ctx => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  try {
    let {goodsCartList = '[]'} = ctx.request.body;
    goodsCartList = JSON.parse(goodsCartList);
    if (goodsCartList.length <= 0) return ctx.body = Utils.responseJSON({errMsg: '商品数不能为空'});
    if (goodsCartList.some(i => i.goodsId === '' || i.goodsId === null)) {
      return ctx.body = Utils.responseJSON({errMsg: '商品id不能为空'});
    }
    if (goodsCartList.some(i => i.goodsNum <= 0)) {
      return ctx.body = Utils.responseJSON({errMsg: '商品数不能小于1件'});
    }

    let goodsIdArr = goodsCartList.map(item => {return item.goodsId})
    let checkout = await CheckoutModule.findOne(
      {'userId': userId, 'goodsId': {'$in': goodsIdArr}, 'payStatus': {'$lte': 1}}
    );
    if (checkout) return ctx.body = Utils.responseJSON({errMsg: '包含已存在的订单，不可重复下单'});

    let innerGoodsCartList = []
    goodsCartList.forEach(item => {
      let dataItem = {
        userId: '',
        goodsId: '',
        goodsNum: 0,
        createTime: new Date().getTime(),
        payTime: null,
        tradeStatus: 0,
        payStatus: 0,
        payType: null,
        payPrice: 0,
        orderNumber: '',
        remarks: ''
      }
      dataItem.userId = userId
      dataItem.goodsId = item.goodsId
      dataItem.goodsNum = item.goodsNum
      dataItem.createTime = new Date().getTime()
      dataItem.orderNumber = Utils.createUniqueOrderNumber(item.goodsId)
      
      innerGoodsCartList.push(dataItem)
    })
    await CheckoutModule.insertMany(innerGoodsCartList)

    // 生成订单成功，清除空应用户的购物车
    await ShopCartModule.deleteMany({'userId': userId})

    ctx.body = Utils.responseJSON({
      result: '已生成订单',
      isSuccess: true,
      code: Code.successCode
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '添加订单出错', code: Code.dbErr});
  }
}

/**
 * 删除订单
 * @method post
 * @param {用户id} userId
 * @param {商品id} goodsId
 */
let deleteCheckout = async ctx => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  let {goodsId = ''} = ctx.request.body;
  if (!goodsId) return ctx.body = Utils.responseJSON({errMsg: '商品id是必须的'});

  try {
    let del = await CheckoutModule.deleteOne({'userId': userId, 'goodsId': goodsId});
    if (!del.n) return ctx.body = Utils.responseJSON({errMsg: '无此条数据'});
    ctx.body = Utils.responseJSON({
      result: '删除订单成功',
      isSuccess: true,
      code: Code.successCode
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '删除数据出错', code: Code.dbErr});
  }
}

/**
 * 修改订状态（支付）
 * @method post
 * @param {用户id} userId
 * @param {商品id数组} goodsIdList
 * @param {支付方式} payType
 * @param {支付金额} payPrice (实际不应前端传支付金额)
 */
let editCheckoutStatus = async ctx => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  try {
    let {goodsIdList = '[]', payType = null, payPrice = 0} = ctx.request.body;
    goodsIdList = JSON.parse(goodsIdList);
    if (goodsIdList.length <= 0) return ctx.body = Utils.responseJSON({errMsg: '商品id数不能为空'});
    if (goodsIdList.some(i => i === '' || i === null)) {
      return ctx.body = Utils.responseJSON({errMsg: '商品id不能为空'});
    }
    if (!Number(payType)) return ctx.body = Utils.responseJSON({errMsg: '支付方式不能为空'});
    if (!Number(payPrice)) return ctx.body = Utils.responseJSON({errMsg: '付款价格不能小于零'});

    let finds = await CheckoutModule.find({
      'userId': userId,
      'goodsId': {'$in': goodsIdList},
      'payStatus': {'$gte': 2}
    })
    if (finds.length > 0) return ctx.body = Utils.responseJSON({errMsg: '该笔订单已支付过了'});

    // 更新状态
    let res = await CheckoutModule.updateMany(
      {'userId': userId, 'goodsId': {'$in': goodsIdList}},
      {
        $set: {
          'payStatus': 2,
          'payTime': new Date().getTime(),
          'payType': payType,
          'payPrice': payPrice
        }
      }
    );
    if (res.n <= 0) return ctx.body = Utils.responseJSON({errMsg: '支付失败', code: Code.payFail});

    ctx.body = Utils.responseJSON({
      result: '成功',
      isSuccess: true,
      code: Code.successCode
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '修改数据出错', code: Code.dbErr});
  }
}

/**
 * 获取支付订单状态
 * @method get
 * @param {用户id} userId
 */
let getCheckoutStatus = async ctx => {
  let validateTokenResult = Utils.validateToken(ctx);
  if (validateTokenResult.errMsg) return ctx.body = validateTokenResult;
  let {userId = ''} = validateTokenResult;
  if (Utils.isEmpty(userId)) return ctx.body = Utils.responseJSON({errMsg: '用户id是必须的，请传入token'});

  try {
    let statusArr = await CheckoutModule.find(
      {'userId': userId},
      {tradeStatus: 1, payStatus: 1, _id: 0}
    )
    let hasFinished = statusArr.some(item => item.payStatus <= 1)

    ctx.body = {
      hasFinished: hasFinished,
      ...Utils.responseJSON({
        result: statusArr,
        isSuccess: true,
        code: Code.successCode
      })
    }
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询数据出错', code: Code.dbErr});
  }
}

module.exports = {
  getCheckoutList: ['GET', '/api/getCheckoutList' , getCheckoutList],
  getPayCheckoutList: ['GET', '/api/getPayCheckoutList' , getPayCheckoutList],
  addCheckout: ['POST', '/api/addCheckout' , addCheckout],
  deleteCheckout: ['POST', '/api/deleteCheckout' , deleteCheckout],
  editCheckoutStatus: ['POST', '/api/editCheckoutStatus' , editCheckoutStatus],
  getCheckoutStatus: ['GET', '/api/getCheckoutStatus' , getCheckoutStatus]
}
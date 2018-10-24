let Utils = require('../utils/utils');
let GoodsModule = require('../module/goods/Goods');
let Code = require('../config/errCode');

let homeRouter = async (ctx, next) => {
  ctx.body = 'home page';
}

/**
 * 根据商品类型获取数据(类目)
 * @method get
 * @param {商品类型} goodsType
 * @param {查询页数} page
 * @param {返回行数} pageSize
 */
let getDateForGoodsType = async (ctx) => {
  let {goodsType = 0, page = 1, pageSize = 10} = ctx.query;
  let pageskip = page ? parseInt(page) - 1 : 0;
  if (pageskip < 0) pageskip = 0;
  pageSize = pageSize ? parseInt(pageSize) : 10;
  let skipCount = pageskip * pageSize;
  
  let sqlWhere = null;
  if (goodsType) sqlWhere = {'goodsType': parseInt(goodsType)};

  try {
    /**
     * 注意：使用skip做分页查询会有严重的性能问题;
     * 数据量少时可以使用skip做分页查询;
     * 数据量大时禁忌用skip，使用其它方式做分页查询（自行google）
     */
    let goods = await GoodsModule.find(sqlWhere).skip(skipCount).limit(pageSize).exec();
    let goodsCount = await GoodsModule.find(sqlWhere).count();
    
    ctx.body = {
      ...Utils.responseJSON({
        result: goods,
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
    ctx.body = Utils.responseJSON({errMsg: '查询数据出错', code: Code.dbErr});
  }
}

/**
 * 商品列表页
 * @method get
 * @param {商品类型} goodsType 
 * @param {查询页数} page
 * @param {返回行数} pageSize
 * @param {搜索字段} searchWords
 * @param {排序字段：0:销量，1:价格 } orderType
 * @param {排序方式：-1降 1升} sortOrder
 * @param {筛选区间：格式:0-100} filterRange
 * @param {最小价格} minPrice
 * @param {最大价格} maxPrice
 */
let getStoreGoodsList = async (ctx) => {
  let {
    goodsType = 0,
    page = 1,
    pageSize = 9,
    searchWords = null,
    orderType = null,
    sortOrder = null,
    filterRange = null,
    minPrice = null,
    maxPrice = null
  } = ctx.query;
  let pageskip = page ? parseInt(page) - 1 : 0;
  if (pageskip < 0) pageskip = 0;
  pageSize = pageSize ? parseInt(pageSize) : 9;
  let skipCount = pageskip * pageSize;

  if (filterRange) {
    let rangeArr = filterRange.split('-');
    minPrice = parseFloat(rangeArr[0] || 0);
    maxPrice = parseFloat(rangeArr[1] || null);
  }
  let sqlWhere = null;
  if (goodsType) sqlWhere = {'goodsType': goodsType};
  if (searchWords) sqlWhere['title'] = {'$regex': searchWords, '$options': '$g'};
  if (minPrice && maxPrice) sqlWhere['showPrice'] = {'$gte': Number(minPrice), '$lte': Number(maxPrice)};
  // 排序字段
  let sortObj = null;
  if (Number(orderType) === 0) sortObj = {'sold': sortOrder};
  if (Number(orderType) === 1) sortObj = {'showPrice': sortOrder};

  try {
    let goods = await GoodsModule.find(sqlWhere)
      .skip(skipCount)
      .limit(pageSize)
      .sort(sortObj)
      .exec();
    ctx.body = Utils.responseJSON({
      result: goods,
      isSuccess: true,
      code: Code.successCode
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询数据出错', code: Code.dbErr});
  }
}

/**
 * 根据商品id获取商品
 * @method get
 * @param {商品id} goodsId
 */
let getGoodByID = async ctx => {
  let {goodsId = ''} = ctx.query;
  if (!goodsId) return ctx.body = Utils.responseJSON({errMsg: '商品ID是必须的'});

  try {
    let goodsItem = await GoodsModule.findOne({'goodsId': goodsId}, null);
    ctx.body = Utils.responseJSON({
      result: goodsItem,
      isSuccess: true,
      code: Code.successCode
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询商品详情数据出错', code: Code.dbErr});
  }
}

module.exports = {
  home: ['GET', '/api/' , homeRouter],
  getGoodsTypeDate: ['GET', '/api/getByCategoty' , getDateForGoodsType],
  getStoreGoodsList: ['GET', '/api/getStoreGoodsList' , getStoreGoodsList],
  getGoodByID: ['GET', '/api/getGoodByID' , getGoodByID]
}
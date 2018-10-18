let Utils = require('../utils/utils');
let GoodsModule = require('../module/goods/Goods');

let homeRouter = async (ctx, next) => {
  ctx.body = 'home page';
}

/**
 * 根据商品类型获取数据(类目)
 * @param {商品类型} goodsType
 * @param {查询页数} page
 * @param {返回行数} pageSize
 */
let getDateForGoodsType = async (ctx) => {
  let {goodsType = 0, page = 1, pageSize = 10} = ctx.query;
  let pageskip = parseInt(page) - 1;
  if (pageskip < 0) pageskip = 0;
  pageSize = parseInt(pageSize);
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
        isSuccess: true
      }),
      ...Utils.repPagination({
        page: page,
        pageSize: pageSize,
        total: goodsCount
      })
    }
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询出错'});
  }
}

/**
 * 商品列表页
 * @param {商品类型} goodsType 
 * @param {查询页数} page
 * @param {返回行数} pageSize
 * @param {搜索字段} searchWords
 * @param {排序字段} orderType
 * @param {排序方式} sortOrder
 * @param {筛选区间} filterRange
 * @param {最小价格} minPrice
 * @param {最大价格} maxPrice
 */
let getStoreGoodsList = async (ctx) => {
  let {
    goodsType = null,
    page = 1,
    pageSize = 9,
    searchWords = null,
    orderType = null,
    sortOrder = null,
    filterRange = null,
    minPrice = 0,
    maxPrice = null
  } = ctx.query;
  let pageskip = parseInt(page) - 1;
  if (pageskip < 0) pageskip = 0;
  pageSize = parseInt(pageSize);
  let skipCount = pageskip * pageSize;

  let sqlWhere = {
    'goodsType': goodsType,
    'title': '',
    'showPrice': {'$gte': Number(minPrice), '$lte': Number(maxPrice)}
  };

  try {
    let goods = await GoodsModule.find(sqlWhere)
      .skip(skipCount)
      .limit(pageSize)
      .sort({'sold': orderType, 'showPrice': orderType})
      .exec();
    ctx.body = Utils.responseJSON({
      result: goods,
      isSuccess: true
    })
  } catch (error) {
    ctx.body = Utils.responseJSON({errMsg: '查询数据出错'});
  }
}

module.exports = {
  home: ['GET', '/api/' , homeRouter],
  getGoodsTypeDate: ['GET', '/api/getByCategoty' , getDateForGoodsType],
  getStoreGoodsList: ['GET', '/api/getStoreGoodsList' , getStoreGoodsList]
}
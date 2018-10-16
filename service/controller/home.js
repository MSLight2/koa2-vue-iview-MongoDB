let GoodsModule = require('../module/goods/Goods');

let homeRouter = async (ctx, next) => {
  ctx.body = 'home page';
}

/**
 * @name 批量数据导入
 */
let manyDataInsert = async (ctx) => {
  let computerData = require('../json/computer');
  let phoneData = require('../json/phone');
  let headsetData = require('../json/headset');
  let cameraData = require('../json/camera');
  let hoursElecData = require('../json/hoursElec');
  let AIData = require('../json/AI');

  let dataArr = [computerData, phoneData, headsetData, cameraData, hoursElecData, AIData];
  let insertDataArr = []
  dataArr.forEach((obj, index) => {
    obj.itemsArray.forEach((item) => {
      let dataItem = {
        goodsType: 0,
        goodsId: '',
        title: '',
        location: '',
        originalPrice: '0.00',
        discountPrice: '0',
        quantity: 10,
        mainPicPath: '',
        goodRate: '',
        auctionURL: ''
      }
  
      dataItem.goodsType = index + 1;
      dataItem.goodsId = item.item_id;
      dataItem.title = item.title || item.nick;
      dataItem.location = item.location || item.sellerLoc || item.area;
      dataItem.originalPrice = item.price || item.priceWap;
      dataItem.discountPrice = item.priceWap || item.priceWithRate || item.priceShow.price;
      dataItem.quantity = item.quantity;
      dataItem.mainPicPath = item.pic_path;
      dataItem.goodRate = item.goodRate;
      dataItem.auctionURL = item.auctionURL || item.shopInfo.url
  
      insertDataArr.push(dataItem)
    });
  })

  GoodsModule.insertMany(insertDataArr, (err, doc) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('批量插入成功！');
  });

  ctx.body = 'home page';
}
/**
 * @name 批量数据删除
 */
let manyDataDelete = async (ctx) => {
  let {name = '', val = ''} = ctx.request.body;
  let sqlWhere = null
  if (name && val) {
    sqlWhere = {[name]: val}
  }
  GoodsModule.deleteMany(sqlWhere, err => { console.log(err) });
}

module.exports = {
  text: ['GET', '/api/' , homeRouter],
  manyDataInsert: ['GET', '/api/db/manyInsert' , manyDataInsert],
  manyDataDelete: ['GET', '/api/db/manyDelete' , manyDataDelete]
}
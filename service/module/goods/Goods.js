const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 商品类目（goodsType）
 * 1：电脑
 * 2：智能手机
 * 3：耳机
 * 4：相机
 * 5：家电
 * 6：AI智能
 */
let GoodSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, default: function () { return new mongoose.Types.ObjectId() }},
  goodsType: {type: Number, default: 0},
  goodsId: {type: String, default: ''},
  title: {type: String, default: ''},
  location: {type: String, default: ''},
  originalPrice: {type: String, default: '0'},
  discountPrice: {type: String, default: '0'},
  showPrice: {type: String, default: '0'},
  quantity: {type: Number, default: '0'},
  mainPicPath: {type: String, default: ''},
  goodRate: {type: String, default: '0'},
  auctionURL: {type: String, default: ''},
  sold: {type: Number, default: 0}
}, {versionKey: false})

module.exports = mongoose.model('good', GoodSchema);
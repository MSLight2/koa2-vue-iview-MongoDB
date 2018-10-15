const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GoodSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, default: function () { return new mongoose.Types.ObjectId() }},
  goodsType: {type: String, default: 0},
  goodsId: {type: String},
  title: {type: String},
  location: {type: String},
  originalPrice: {type: String},
  discountPrice: {type: String},
  quantity: {type: Number},
  mainPicPath: {type: String},
  goodRate: {type: String},
  auctionURL: {type: String}
})

module.exports = mongoose.model('shopCart', GoodSchema);
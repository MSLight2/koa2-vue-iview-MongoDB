var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * 此订单表设计比较简单，仅作为学习参考。真实项目的订单表要复杂的多
 */
var checkoutSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, default: function () { return new mongoose.Types.ObjectId() }},
  userId: String,
  goodsId: String,
  goodsNum: Number,
  createTime: String,
  payTime: String,
  tradeStatus: Number,
  payStatus: Number,
  orderNumber: String,
}, {versionKey: false})

module.exports = mongoose.model('checkout', checkoutSchema);
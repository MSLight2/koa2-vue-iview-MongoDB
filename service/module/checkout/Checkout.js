var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * 此订单表设计比较简单，仅作为学习参考。真实项目的订单表要复杂的多
 * @param {订单状态：0:待发货，1:已发货，2:已收货，3:退货中，4:已退货，5:已完成} tradeStatus
 * @param {订单支付状态；0:未支付，1:转账中，2:已支付，4:退款中，5:已退款} payStatus
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
  payType: Number,
  payPrice: Number,
  orderNumber: String,
  remarks: String
}, {versionKey: false})

module.exports = mongoose.model('checkout', checkoutSchema);
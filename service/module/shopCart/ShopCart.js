const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let shopCartSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, default: function () { return new mongoose.Types.ObjectId() }},
  userId: {type: String},
  goodsId: {type: String},
  number: {type: Number},
  status: {type: Number},
  create_time: {type: String},
  update_time: {type: String}
}, {versionKey: false})

module.exports = mongoose.model('shopCart', shopCartSchema, 'shopCart');
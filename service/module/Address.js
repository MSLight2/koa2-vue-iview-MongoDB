var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, default: function () { return new mongoose.Types.ObjectId() }},
  userId: String,
  nickName: String,
  email: String,
  detailAddress: String,
  city: String,
  phone: String,
  isDefault: {type: Boolean, default: false},
}, {versionKey: false})

module.exports = mongoose.model('address', addressSchema);
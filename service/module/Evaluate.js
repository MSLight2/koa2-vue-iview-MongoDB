var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var evaluateSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, default: function () { return new mongoose.Types.ObjectId() }},
  userId: String,
  goodsId: String,
  createTime: String
}, {versionKey: false})

module.exports = mongoose.model('evaluate', evaluateSchema);
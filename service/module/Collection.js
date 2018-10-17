var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var collectionSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, default: function () { return new mongoose.Types.ObjectId() }},
  userId: String,
  goodsId: String,
  collectionTime: String
}, {versionKey: false})

module.exports = mongoose.model('collection', collectionSchema);
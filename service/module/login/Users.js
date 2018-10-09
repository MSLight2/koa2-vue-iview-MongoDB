var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  sex: Number,
  email: String,
  address: String,
  nickName: String,
  birthday: {type: Date, default: Date.now},
  phone: String,
  password: String,
  isDelete: Boolean
})

module.exports = mongoose.model('users', usersSchema);
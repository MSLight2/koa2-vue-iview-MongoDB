var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * 关于_id默认值：
 * 不要使用default: new mongoose.Types.ObjectId(),这种方式重复插入会报错，如果使用这种方式
 * 则插入数据时要指定_id字段：_id:  new mongoose.Types.ObjectId()
 * 建议使用方法模式返回（如下）
 */
var usersSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, default: function () { return new mongoose.Types.ObjectId() }},
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
/**
 * 获取用户收货地址
 * @method get
 * @param {用户id} userId
 */
let getAddressList = async ctx => {
}

/**
 * 添加收货地址
 * @method post
 * @param {*} ctx 
 */
let addAddress = async ctx => {
}

/**
 * 编辑收货地址
 * @method post
 * @param {*} ctx 
 */
let editAddress = async ctx => {
}

/**
 * 删除收货地址
 * @method post
 * @param {*} ctx 
 */
let deleteAddress = async ctx => {
}

module.exports = {
  getAddressList: ['GET', '/api/getAddressList' , getAddressList],
  addAddress: ['POST', '/api/getAddressList' , addAddress],
  editAddress: ['POST', '/api/editAddress' , editAddress],
  deleteAddress: ['POST', '/api/deleteAddress' , deleteAddress],
}
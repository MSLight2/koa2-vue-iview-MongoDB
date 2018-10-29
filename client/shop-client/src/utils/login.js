import StorageUtils from './storage'

const userTokenKey = 'USER_TOKEN'
const userName = 'USER_NAME'
const rememberPwd = 'REM_PWD'

export default {
  getToken () {
    return StorageUtils.getLoacalStorage(userTokenKey)
  },
  setToken (val) {
    StorageUtils.setLoacalStorage(userTokenKey, val)
  },
  getName () {
    return StorageUtils.getLoacalStorage(userName)
  },
  setName (val) {
    StorageUtils.setLoacalStorage(userName, val)
  },
  getPwd () {
    return StorageUtils.getLoacalStorage(rememberPwd)
  },
  setPwd (val) {
    StorageUtils.setLoacalStorage(rememberPwd, val)
  }
}

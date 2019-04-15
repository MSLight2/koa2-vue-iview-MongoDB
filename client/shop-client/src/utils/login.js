import StorageUtils from './storage'

const userTokenKey = 'SPA_USER_TOKEN'
const userLoginStatus = 'SPA_USER_STATUS'
const userName = 'SPA_USER_NAME'
const rememberPwd = 'SPA_REM_PWD'

export default {
  getToken () {
    return StorageUtils.getLoacalStorage(userTokenKey)
  },
  setToken (val) {
    StorageUtils.setLoacalStorage(userTokenKey, val)
  },
  getLoginStatus () {
    return StorageUtils.getSessionStorage(userLoginStatus, true)
  },
  setLoginStatus (val) {
    return StorageUtils.setSessionStorage(userLoginStatus, val)
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

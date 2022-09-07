import StorageUtils from './Storage'

const userTokenKey = 'SPA_USER_TOKEN_V3'
const userLoginStatus = 'SPA_USER_STATUS_V3'
const userName = 'SPA_USER_NAME_V3'
const rememberPwd = 'SPA_REM_PWD_V3'

export default {
  getToken () {
    return StorageUtils.getLoacalStorage(userTokenKey)
  },
  setToken (val: string) {
    StorageUtils.setLoacalStorage(userTokenKey, val)
  },
  removeToken () {
    StorageUtils.removeLoacalStorage(userTokenKey)
  },
  getLoginStatus () {
    return StorageUtils.getSessionStorage(userLoginStatus, true)
  },
  setLoginStatus (val: string | boolean) {
    return StorageUtils.setSessionStorage(userLoginStatus, val)
  },
  removeLoginStatus () {
    StorageUtils.removeSessionStorage(userLoginStatus)
  },
  getName () {
    return StorageUtils.getLoacalStorage(userName)
  },
  setName (val: string) {
    StorageUtils.setLoacalStorage(userName, val)
  },
  removeName (key: string) {
    StorageUtils.removeLoacalStorage(key)
  },
  getPwd () {
    return StorageUtils.getLoacalStorage(rememberPwd)
  },
  setPwd (val: string) {
    StorageUtils.setLoacalStorage(rememberPwd, val)
  },
  removePwd () {
    StorageUtils.removeLoacalStorage(rememberPwd)
  }
}

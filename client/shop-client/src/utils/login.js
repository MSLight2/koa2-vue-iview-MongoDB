import StorageUtils from './storage'

const userTokenKey = 'USER_TOKEN'

export default {
  getToken () {
    return StorageUtils.getLoacalStorage(userTokenKey)
  },
  setToken (val) {
    StorageUtils.setLoacalStorage(userTokenKey, val)
  }
}
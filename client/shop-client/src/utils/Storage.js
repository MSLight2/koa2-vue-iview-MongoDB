export default {
  /**
   * loacal storage
   * @param {键值} key
   * @param {是否转需要换为json格式} needConvert
   */
  getLoacalStorage (key, needConvert = false) {
    if (!key) return null
    let result = localStorage.getItem(key)
    if (needConvert) {
      try {
        return JSON.parse(result)
      } catch (error) {
        return result
      }
    } else {
      return result
    }
  },
  setLoacalStorage (key, value) {
    if (!key) return
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  },
  removeLoacalStorage (key) {
    if (!key) return
    localStorage.removeItem(key)
  },
  /**
   * session storage
   * @param {键值} key
   * @param {是否转需要换为json格式} needConvert
   */
  getSessionStorage (key, needConvert = false) {
    if (!key) return null
    let result = localStorage.getItem(key)
    if (needConvert) {
      try {
        return JSON.parse(result)
      } catch (error) {
        return result
      }
    } else {
      return result
    }
  },
  setSessionStorage (key, value) {
    if (!key) return
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }
    sessionStorage.setItem(key, value)
  },
  removeSessionStorage (key) {
    if (!key) return
    sessionStorage.removeItem(key)
  }
}

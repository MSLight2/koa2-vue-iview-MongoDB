export default {
  /**
   * loacal storage
   * @param {键值} key
   * @param {是否转需要换为json格式} needConvert
   */
  getLoacalStorage (key: string, needConvert = false) {
    if (!key) return null
    let result = localStorage.getItem(key) || ''
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
  setLoacalStorage (key: string, value: any) {
    if (!key) return
    if (value && typeof value !== 'string') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  },
  removeLoacalStorage (key: string) {
    if (!key) return
    localStorage.removeItem(key)
  },
  /**
   * session storage
   * @param {键值} key
   * @param {是否转需要换为json格式} needConvert
   */
  getSessionStorage (key: string, needConvert = false) {
    if (!key) return null
    let result = sessionStorage.getItem(key) || ''
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
  setSessionStorage (key: string, value: any) {
    if (!key) return
    if (value && typeof value !== 'string') {
      value = JSON.stringify(value)
    }
    sessionStorage.setItem(key, value)
  },
  removeSessionStorage (key: string) {
    if (!key) return
    sessionStorage.removeItem(key)
  }
}

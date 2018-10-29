export default {
  isPhone (val) {
    if (/^1[34578][0-9]{9}$/g.test(val)) {
      return true
    } else {
      return false
    }
  },
  isEmail (val) {
    if (/^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/g.test(val)) {
      return true
    } else {
      return false
    }
  }
}

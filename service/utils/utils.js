module.exports = {
  isEmpty (val) {
    val = val.trim();
    if (val === null || val === '' || val.length <= 0 || val === undefined) {
      return true;
    } else {
      return false;
    }
  }
}
const crypto = require('crypto');

module.exports = {
  md5Encode (encodeStr) {
    let md5Str = crypto.createHash('md5').update(encodeStr).digest('hex').toUpperCase();
    return md5Str
  }
}
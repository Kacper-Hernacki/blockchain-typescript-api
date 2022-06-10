export {};
const uuidV1 = require("uuid/v1");
const SHA256 = require("crypto-js/sha256");

class ChainUtil {
  static genKeyPair(secret: any) {
    return eddsa.keyFromSecret(secret);
  }

  static id() {
    return uuidV1();
  }

  static hash(data: any) {
    return SHA256(JSON.stringify(data)).toString();
  }
}
module.exports = ChainUtil;

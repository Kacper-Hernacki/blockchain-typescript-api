export {};
const uuid = require("uuid");
const SHA256 = require("crypto-js/sha256");
const EDDSA = require("elliptic").eddsa;
const eddsa = new EDDSA("ed25519");

class ChainUtil {
  static genKeyPair(secret: any) {
    return eddsa.keyFromSecret(secret);
  }

  static id() {
    return uuid.v1();
  }

  static hash(data: any) {
    return SHA256(JSON.stringify(data)).toString();
  }
}
module.exports = ChainUtil;

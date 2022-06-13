"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const uuidV1 = require("uuid/v1");
const SHA256 = require("crypto-js/sha256");
class ChainUtil {
    static genKeyPair(secret) {
        return eddsa.keyFromSecret(secret);
    }
    static id() {
        return true; //uuidV1();
    }
    static hash(data) {
        return SHA256(JSON.stringify(data)).toString();
    }
}
module.exports = ChainUtil;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require('uuid');
const SHA256 = require('crypto-js/sha256');
const EDDSA = require('elliptic').eddsa;
const eddsa = new EDDSA('ed25519');
class ChainUtil {
    static genKeyPair(secret) {
        return eddsa.keyFromSecret(secret);
    }
    static id() {
        return uuid.v1();
    }
    static hash(data) {
        return SHA256(JSON.stringify(data)).toString();
    }
}
module.exports = ChainUtil;

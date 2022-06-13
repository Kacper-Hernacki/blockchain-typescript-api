"use strict";
const EDDSA = require("elliptic").eddsa;
const eddsa = new EDDSA("ed25519");
const ChainUtil = require("./chainUtill");
const INITIAL_BALANCE = require("./config");
const Transaction = require("./transaction");
class Wallet {
    constructor(secret) {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair(secret);
        this.publicKey = this.keyPair.getPublic("hex");
    }
    toString() {
        return `Wallet - 
          publicKey: ${this.publicKey.toString()}
          balance  : ${this.balance}`;
    }
    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }
    createTransaction(to, amount, type, blockchain, transactionPool) {
        let transaction = Transaction.newTransaction(this, to, amount, type);
        transactionPool.addTransaction(transaction);
        return transaction;
    }
}
module.exports = Wallet;

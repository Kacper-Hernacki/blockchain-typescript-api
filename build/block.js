"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SHA256 = require('crypto-js/sha256');
class Block {
    constructor(timestamp, transactions, previousHash, hash, nonce, validator, signature) {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = hash;
        this.nonce = 0;
        this.validator = validator;
        this.signature = signature;
    }
    toString() {
        return `Block - 
        Timestamp : ${this.timestamp}
        Last Hash : ${this.previousHash}
        Hash      : ${this.hash}
        Data      : ${this.transactions}
        Validator : ${this.validator}
        Signature : ${this.signature}`;
    }
    static genesis() {
        return new this(`genesis time`, [`genesis block`], 'genesis block', this.hash(`genesis time`, '', []), 1, 'genesis block', 'genesis block');
    }
    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
    static createBlock(lastBlock, data) {
        let hash;
        const timestamp = Date.now().toString();
        const lastHash = lastBlock.hash;
        hash = Block.hash(timestamp, lastHash, data);
        return new this(timestamp, [], lastHash, hash, 1, '', '');
    }
    static blockHash(block) {
        const { timestamp, lastHash, data } = block;
        return Block.hash(timestamp, lastHash, data);
    }
}
module.exports = Block;

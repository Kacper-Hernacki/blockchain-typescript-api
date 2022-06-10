const SHA256 = require("crypto-js/sha256");
export {};
// Block
interface BlockInterface {
  timestamp: string;
  transactions: Array<any>;
  previousHash: string;
  hash: string;
  nonce: number;
  validator: string;
  signature: string;
  toString(): string;
}

class Block implements BlockInterface {
  timestamp: string;
  transactions: Array<any>;
  previousHash: string;
  hash: string;
  nonce: number;
  validator: string;
  signature: string;

  constructor(
    timestamp: string,
    transactions: Array<any>,
    previousHash: string,
    hash: string,
    nonce: number,
    validator: string,
    signature: string
  ) {
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
    return new this(
      `genesis time`,
      [`genesis block`],
      "genesis block",
      this.hash(`genesis time`, "", []),
      1,
      "genesis block",
      "genesis block"
    );
  }

  static hash(timestamp: string, lastHash: string, data: Array<any>) {
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }

  static createBlock(lastBlock: any, data: Array<any>) {
    let hash;
    const timestamp = Date.now().toString();
    const lastHash = lastBlock.hash;
    hash = Block.hash(timestamp, lastHash, data);

    return new this(timestamp, [], lastHash, hash, 1, "", "");
  }

  static blockHash(block: any) {
    const { timestamp, lastHash, data } = block;
    return Block.hash(timestamp, lastHash, data);
  }
}

module.exports = Block;

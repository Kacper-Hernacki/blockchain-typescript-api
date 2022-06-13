const EDDSA = require("elliptic").eddsa;
const eddsa = new EDDSA("ed25519");
const ChainUtil = require("./chainUtill");

interface WalletInterface {
  balance: number;
  keyPair: any;
  publicKey: string;
  createTransaction(
    to: string,
    amount: number,
    type: any,
    blockchain: any,
    transactionPool: any
  ): any;
}

class Wallet implements WalletInterface {
  balance: number;
  keyPair: any;
  publicKey: string;

  constructor(secret: any) {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair(secret);
    this.publicKey = this.keyPair.getPublic("hex");
  }

  toString() {
    return `Wallet - 
          publicKey: ${this.publicKey.toString()}
          balance  : ${this.balance}`;
  }

  sign(dataHash: any) {
    return this.keyPair.sign(dataHash);
  }

  createTransaction(
    to: string,
    amount: number,
    type: any,
    blockchain: any,
    transactionPool: any
  ) {
    let transaction = Transaction.newTransaction(this, to, amount, type);
    transactionPool.addTransaction(transaction);
    return transaction;
  }
}
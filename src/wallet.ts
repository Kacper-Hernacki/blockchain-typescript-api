const EDDSA = require("elliptic").eddsa;
const eddsa = new EDDSA("ed25519");
const ChainUtil = require("./chainUtill");

interface WalletInterface {
  balance: number;
  keyPair: any;
  publicKey: string;
}

class Wallet implements WalletInterface {
  balance: number;
  keyPair: any;
  publicKey: string;

  constructor(secret: any) {
    this.balance = 0;
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
}

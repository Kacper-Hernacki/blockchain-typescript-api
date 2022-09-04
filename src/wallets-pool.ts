const Wallet = require('./wallet');

interface WalletsPoolInterface {
    wallets: Array<any>;
    addWallet(arg: any): any;
}

export class WalletsPool implements WalletsPoolInterface {
    wallets: Array<any>;

    constructor(wallets: Array<any>) {
        this.wallets = [];
    }

    addWallet(wallet: any) {
        this.wallets.push(wallet);
    }
}

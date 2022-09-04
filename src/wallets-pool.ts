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
        const serializedWallet = { publicKey: wallet?.publicKey, privateKey: wallet?.privateKey, balance: wallet?.balance };
        this.wallets.push(serializedWallet);
    }

    getWalletByPrivateKey(privateKey: string) {
        return this.wallets.find((wallet) => wallet.privateKey === privateKey);
    }
}

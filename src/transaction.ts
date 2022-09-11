export {};
const { INITIAL_BALANCE, TRANSACTION_FEE } = require('./config');
const ChainUtil = require('./chainUtill');

export class Transaction {
    id: number;
    type: any;
    input: any;
    output: any;

    constructor() {
        this.id = ChainUtil.id();
        this.type = null;
        this.input = null;
        this.output = null;
    }

    static newTransaction(senderWallet: any, to: string, amount: number, type: any) {
        if (amount + TRANSACTION_FEE > senderWallet.balance) {
            console.log('Not enough balance');
            return;
        }

        return Transaction.generateTransaction(senderWallet, to, amount, type);
    }

    static generateTransaction(senderWallet: any, to: string, amount: number, type: any) {
        const transaction = new this();

        transaction.type = type;
        transaction.output = {
            to: to,
            amount: amount - TRANSACTION_FEE,
            fee: TRANSACTION_FEE
        };

        Transaction.signTransaction(transaction, senderWallet);
        return transaction;
    }

    static signTransaction(transaction: any, senderWallet: any) {
        transaction.input = {
            timestamp: Date.now(),
            from: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(transaction.output))
        };
    }

    static verifyTransaction(transaction: any) {
        return ChainUtil.verifySignature(transaction.input.from, transaction.input.signature, ChainUtil.hash(transaction.output));
    }
}

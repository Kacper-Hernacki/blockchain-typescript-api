const Transaction = require('./transaction');

interface TransactionPoolInterface {
    transactions: Array<any>;
    addTransaction(arg: any): any;
    validTransactions(arg: any): any;
}

export class TransactionPool implements TransactionPoolInterface {
    transactions: Array<any>;

    constructor(transactions: Array<any>) {
        this.transactions = [];
    }

    addTransaction(transaction: any) {
        const serializedTransaction = { id: transaction?.id, type: transaction?.type, input: transaction?.input, output: transaction?.output };
        this.transactions.push(serializedTransaction);
    }

    validTransactions() {
        return this.transactions.filter((transaction) => {
            if (!Transaction.verifyTransaction(transaction)) {
                console.log(`Invalid signature from ${transaction.data.from}`);
                return;
            }

            return transaction;
        });
    }
}

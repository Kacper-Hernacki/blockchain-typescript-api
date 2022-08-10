"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionPool = void 0;
const Transaction = require('./transaction');
class TransactionPool {
    constructor(transactions) {
        this.transactions = [];
    }
    addTransaction(transaction) {
        this.transactions.push(transaction);
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
exports.TransactionPool = TransactionPool;

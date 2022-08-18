import { NextFunction, Request, Response } from 'express';
import { Blockchain } from '../blockchain';
import { Wallet } from '../wallet';
import { TransactionPool } from '../transaction-pool';

// create a new blockchain instance
const blockchain = new Blockchain();

// create a new wallet
const wallet = new Wallet(Date.now().toString());
const transactionPool = new TransactionPool([]);

const serverHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'server running ok'
    });
};

const blocksStatus = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(blockchain.chain);
};

const transactionsStatus = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(transactionPool.transactions);
};

const createTransaction = (req: Request, res: Response, next: NextFunction) => {
    const { to, amount, type } = req.body;

    const transaction = wallet.createTransaction(to, amount, type, blockchain, transactionPool);

    return res.status(200).json({ transaction: transaction.output });
};

const mineBlock = (req: Request, res: Response, next: NextFunction) => {
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    return res.status(200).json({ data: block });
};

export default { serverHealthCheck, blocksStatus, transactionsStatus, createTransaction, mineBlock };

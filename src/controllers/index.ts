import { NextFunction, Request, Response } from 'express';
import { Blockchain } from '../blockchain';
import { Wallet } from '../wallet';
import { TransactionPool } from '../transaction-pool';
import { WalletsPool } from '../wallets-pool';

// create a new blockchain instance
const blockchain = new Blockchain();
const transactionPool = new TransactionPool([]);
const walletsPool = new WalletsPool([]);

const serverHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'server running ok'
    });
};

const blocksStatus = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(blockchain.chain);
};

const getWallet = (req: Request, res: Response, next: NextFunction) => {
    const wallet = new Wallet(Date.now().toString()); // to remove
    return res.status(200).json({ publicKey: wallet.publicKey, privateKey: wallet.privateKey, balance: wallet.balance });
};

const getWalletsPool = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(walletsPool);
};

const createWallet = (req: Request, res: Response, next: NextFunction) => {
    const wallet = new Wallet(Date.now().toString());
    console.log(wallet);
    walletsPool.addWallet(wallet);
    console.log(walletsPool);
    console.log(`New wallet added`);
    return res.status(200).json({ data: wallet });
};

const transactionsStatus = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(transactionPool);
};

const createTransaction = (req: Request, res: Response, next: NextFunction) => {
    const { to, amount, type } = req.body;
    // getWallet
    const wallet = new Wallet(Date.now().toString());
    // Remove that
    const transaction = wallet.createTransaction(to, amount, type, blockchain, transactionPool);
    transactionPool.addTransaction(transaction);
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    return res.status(200).json({ block: block, transaction: transaction.output });
};

const mineBlock = (req: Request, res: Response, next: NextFunction) => {
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    return res.status(200).json({ data: block });
};

export default { createWallet, getWallet, serverHealthCheck, blocksStatus, transactionsStatus, createTransaction, mineBlock, getWalletsPool };

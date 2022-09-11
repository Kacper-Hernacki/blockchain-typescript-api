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
    const wallet = walletsPool?.wallets[0]; // to remove
    return res.status(200).json({ publicKey: wallet.publicKey, privateKey: wallet.privateKey, balance: wallet.balance });
};

const getWalletByPrivateKey = (req: Request, res: Response, next: NextFunction) => {
    const { privateKey } = req.params;

    const wallet = walletsPool.getWalletByPrivateKey(privateKey);
    return res.status(200).json(wallet);
};

const getWalletByPublicKey = (req: Request, res: Response, next: NextFunction) => {
    const { publicKey } = req.params;

    const wallet = walletsPool.getWalletByPublicKey(publicKey);
    return res.status(200).json(wallet);
};

const getWalletsPool = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(walletsPool?.wallets);
};

const createWallet = (req: Request, res: Response, next: NextFunction) => {
    const wallet = new Wallet(Date.now().toString());
    const serializedWallet = { publicKey: wallet?.publicKey, privateKey: wallet?.privateKey, balance: wallet?.balance, secret: wallet?.secret };
    walletsPool.addWallet(serializedWallet);
    console.log(`New wallet added`, serializedWallet);
    return res.status(200).json(serializedWallet);
};

const transactionsStatus = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(transactionPool?.transactions);
};

const createTransaction = (req: Request, res: Response, next: NextFunction) => {
    const { to, amount, type, publicKey } = req.body;
    // getWallet
    const senderWallet = walletsPool.getWalletByPublicKey(publicKey);
    const wallet = new Wallet(senderWallet?.secret);

    const transaction = wallet.createTransaction(to, amount, type, blockchain, transactionPool);

    console.log(transaction);

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

export default { createWallet, serverHealthCheck, getWallet, blocksStatus, transactionsStatus, createTransaction, mineBlock, getWalletsPool, getWalletByPrivateKey };

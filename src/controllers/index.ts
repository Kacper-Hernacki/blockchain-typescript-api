import { NextFunction, Request, Response } from 'express';
import { Blockchain } from '../blockchain';

// create a new blockchain instance
const blockchain = new Blockchain();

const serverHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'server running ok'
    });
};

const blocksStatus = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(blockchain.chain);
};

export default { serverHealthCheck, blocksStatus };

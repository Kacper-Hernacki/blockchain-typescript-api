import express, { Request, Response } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import routes from './routes';

// Blockchain data
import { Blockchain } from './blockchain';
import { Wallet } from './wallet';
import { TransactionPool } from './transaction-pool';

const NAMESPACE = 'Server';

//create a new app
const app = express();

//logging the request
app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}]`);

    res.on(`finish`, () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});

// parse the request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rules of API
app.use((req, res, next) => {
    // remove in production
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

// create a new blockchain instance
const blockchain = new Blockchain();

// create a new wallet
const wallet = new Wallet(Date.now().toString());
const transactionPool = new TransactionPool([]);

// Routes
app.use('/api', routes);

// // api to view transaction in the transaction pool
// app.get('/transactions', (req: Request, res: Response) => {
//     res.json(transactionPool.transactions);
// });

// //api to add blocks
// app.post('/mine', (req: Request, res: Response) => {
//     const block = blockchain.addBlock(req.body.data);
//     console.log(`New block added: ${block.toString()}`);

//     res.redirect('/blocks');
// });

// // create transactions
// app.post('/transact', (req: Request, res: Response) => {
//     const { to, amount, type } = req.body;
//     console.log(req.body);
//     const transaction = wallet.createTransaction(to, amount, type, blockchain, transactionPool);
//     res.redirect('/transactions');
// });

/* Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

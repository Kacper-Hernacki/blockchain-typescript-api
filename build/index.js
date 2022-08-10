"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
// import { Blockchain } from './blockchain';
// import { Wallet } from './wallet';
// import { TransactionPool } from './transaction-pool';
const sample_1 = __importDefault(require("./routes/sample"));
const NAMESPACE = 'Server';
//create a new app
const app = (0, express_1.default)();
//logging the request
app.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}]`);
    res.on(`finish`, () => {
        logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});
// parse the request
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
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
/** Routes go here */
// create a new blockchain instance
// const blockchain = new Blockchain();
// // create a new wallet
// const wallet = new Wallet(Date.now().toString());
// const transactionPool = new TransactionPool([]);
// //EXPOSED APIs
// //api to get the blocks
// app.get('/blocks', (req: Request, res: Response) => {
//     res.json(blockchain.chain);
// });
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
app.use('/sample', sample_1.default);
/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});
const httpServer = http_1.default.createServer(app);
httpServer.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server is running ${config_1.default.server.hostname}:${config_1.default.server.port}`));

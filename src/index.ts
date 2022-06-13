import express, { Request, Response } from "express";
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
const Wallet = require("./wallet");
const TransactionPool = require("./transaction-pool");

//get the port from the user or set the default port
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//create a new app
const app = express();

//using the blody parser middleware
app.use(bodyParser.json());

// create a new blockchain instance
const blockchain = new Blockchain();

// create a new wallet
const wallet = new Wallet(Date.now().toString());

const transactionPool = new TransactionPool();

//EXPOSED APIs

//api to get the blocks
app.get("/blocks", (req: Request, res: Response) => {
  res.json(blockchain.chain);
});

// api to view transaction in the transaction pool
app.get("/transactions", (req: Request, res: Response) => {
  res.json(transactionPool.transactions);
});

//api to add blocks
app.post("/mine", (req: Request, res: Response) => {
  const block = blockchain.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);

  res.redirect("/blocks");
});

// app server configurations
app.listen(HTTP_PORT, () => {
  console.log(`listening on port ${HTTP_PORT}`);
});

// create transactions
app.post("/transact", (req: Request, res: Response) => {
  const { to, amount, type } = req.body;
  console.log(req.body);
  const transaction = wallet.createTransaction(
    to,
    amount,
    type,
    blockchain,
    transactionPool
  );
  res.redirect("/transactions");
});

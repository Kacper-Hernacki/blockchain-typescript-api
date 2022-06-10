"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
//get the port from the user or set the default port
const HTTP_PORT = process.env.HTTP_PORT || 3001;
//create a new app
const app = (0, express_1.default)();
//using the blody parser middleware
app.use(bodyParser.json());
// create a new blockchain instance
const blockchain = new Blockchain();
//EXPOSED APIs
//api to get the blocks
app.get("/blocks", (req, res) => {
    res.json(blockchain.chain);
});
//api to add blocks
app.post("/mine", (req, res) => {
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    res.redirect("/blocks");
});
// app server configurations
app.listen(HTTP_PORT, () => {
    console.log(`listening on port ${HTTP_PORT}`);
});

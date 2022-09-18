const Block = require('./block');

// Blockchain
interface BlockchainInterface {
    chain: any;
    addBlock(arg: any): any;
    isValidChain(arg: any): boolean;
}

export class Blockchain implements BlockchainInterface {
    chain;
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock(data: any) {
        const block = Block.createBlock(this.chain[this.chain.length - 1], data);
        this.chain.push(block);

        return block;
    }

    isValidChain(chain: any) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i - 1];

            if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) return false;
        }

        return true;
    }
}

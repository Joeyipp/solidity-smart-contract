// Require will attempt to run the .sol file as if it is a JS file
// which in this, is not a JS file
// require('./contracts/Inbox.sol'); // bad!

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// Ganache/TestRPC: Local test network
// Compile to ByteCode (Run on Ethereum Network) and ABI (Interface between JS and Solidity)
module.exports = solc.compile(source, 1).contracts[":Inbox"];

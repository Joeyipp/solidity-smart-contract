const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    // Account Mnemonic
    'INSERT ACCOUNT MNEMONIC HERE',
    'INSERT INFURA API URL HERE'
);

// This instance is completely enabled for the Ropsten Network
// Can be used to send ether, create contract, update contract
const web3 = new Web3(provider);

const INITIAL_STRING = 'Hi there!';

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    // Use one of those accounts to deploy the contract
    // result = instance of our contract
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0], gas: '1000000' });

    console.log('Contract deployed to', result.options.address);
};

deploy();
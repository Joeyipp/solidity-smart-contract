const assert = require('assert');
const ganache = require('ganache-cli');

// Import a constructor
// Used to create instances of the Web3 library
// Difference instances can connect to different Ethereum Networks
// Web3 interface between our JS app and Ethereum Network
// Portal: Programmatic access to the Ethereum World
// Ganache -> Provider -> web3 <- Web3
// A Provider is a communication layer to exchange messages between web3 library and Ethereum Network
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let inbox; // represents our inbox contract
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
    // Get a list of all accounts 
    // Promises
    // web3.eth.getAccounts().then((fetchedAccounts) => {
    //     console.log(fetchedAccounts);
    // })

    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0], gas: '1000000' })

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        // .ok asserts that there is some value exists (not null or undefined)
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        // .call() is one of the running contract functions (call(), send())
        // .call() cannot modify the contract's data, can return data, runs instantly, and free to do!
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });

    it('can change the message', async () => {
        // Use .send() to send this transaction out to the network
        // .send() can modify a contract's data, takes time to execute, returns the transaction hash, and costs money!
        const txhash = await inbox.methods.setMessage('bye bye').send({ from: accounts[0] });
        console.log(txhash);

        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye bye');
    });
})

// Mocha Refresher
// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }

// // Doing some common initialization beforeEach it() statement
// let car;
// beforeEach(() => {
//     car = new Car();
// });

// describe('Car Class', () => {
//     it('can park', () => {
//         // const car = new Car();
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         // const car = new Car();
//         assert.equal(car.drive(), 'vroom');
//     });
// });



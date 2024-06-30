## initial setup
```
yarn install
yarn compile
```

## running server without requiring any solo or test net connectivity

patch the top of src/server.js

```js
// edit this to mock out the net
//-*-*-
// to actually credit user
// import { creditUser } from './creditUser.js';
//--*--
// to mock out and allow running with `node src/server.js`
const creditUser = () => false;
//-*-*-
```

then run with `node src/server.js`


## to run server with solo or test net connectivity
(run from root of repo ./meatless/)
`npx hardhat run src/server.js --network vechain_solo` or `npx hardhat run src/server.js --network vechain_testnet`

## test ui
test ui for image verification and token crediting exposed at http://localhost:8555/verify-image-test.html
___


# Sample Hardhat project

This is a sample project that showcases the usage of the vechain SDK Hardhat plugin, specifically the hardhat-plugin package, with illustrative examples.

## Introduction

The hardhat-plugin package serves as a crucial link between Hardhat and the vechain SDK, simplifying the process of creating, testing, and interacting with smart contracts on the VeChainThor blockchain network. Developers can utilize the functionalities provided by this plugin to seamlessly integrate vechain's blockchain infrastructure into their Hardhat projects.

## Commands

- **Install dependencies**: Execute `yarn install` to install the required dependencies.
- **Compile**: Execute `yarn compile` to compile the smart contracts in the `contracts` folder.
- **Testing**: Execute `yarn test` to test the smart contracts running the tests located on the `test` folder.
- **Deploy**: Execute `yarn deploy-solo` to deploy the smart contracts on the solo network, and `yarn deploy-testnet` to deploy on the vechain testnet. 

## Usage

The `hardhat.config.js` is the main configuration file. By specifying the desired network configurations, such as the network URL and the accounts to be used for signing transactions, developers can seamlessly switch between different networks and environments. Additionally, settings like enabling logging can also be configured to provide more detailed information during development and testing. 
Note that:

- The network name should contain `vechain`, otherwise, it may result in an error.
- In the network configuration, two additional fields can be added: `delegator` and `useDebug`. These fields allow for more customization and control over the network settings, catering to specific project requirements and preferences.
   - **Debug Mode**: The `debugMode` field enables or disables debug mode.
   - **Delegator**: The `delegator` field allows you to delegate the transaction to a delegator. It supports two optional parameters:  - **Delegator**: The `delegator` field allows you to delegate the transaction to a delegator. It supports two optional parameters: `delegatorPrivateKey` and `delegatorUrl`.

This flexibility in the configuration file allows developers to tailor their development experience and adapt it to the requirements of their projects, ensuring a smooth and efficient development process.
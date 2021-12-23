require("@nomiclabs/hardhat-waffle");
const fs = require('fs');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const BSC_TESTNET_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
const TESTNET_PRIVATE_KEY = ''
const MAINNET_PRIVATE_KEY = fs.readFileSync(".secret").toString().trim();

const defaultNetwork = "bscMainnetFork";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",

  defaultNetwork,
  networks: {
    hardhat: {
      forking: {
        url: "http://localhost:8001"
      }
    },
    bscMainnetFork: {
      url: "http://localhost:8545",
      accounts: [`0x${MAINNET_PRIVATE_KEY}`],
    },
    bscTestnet: {
      url: BSC_TESTNET_URL,
      accounts: [`0x${TESTNET_PRIVATE_KEY}`],
    },
    bscMainnet: {
      url: "https://bsc-dataseed.binance.org/",
      accounts: [`0x${MAINNET_PRIVATE_KEY}`],
    },
  }
};

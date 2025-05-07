require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    bsc: {
      url: "https://bsc-testnet.drpc.org",
      chainId: 97,
      accounts: [PRIVATE_KEY],
    },
  },
};
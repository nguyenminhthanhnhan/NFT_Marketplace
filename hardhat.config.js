require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      url: "http://localhost:8545", // Replace with your local Ethereum node URL
    },
  },
  solidity: "0.8.18",
};

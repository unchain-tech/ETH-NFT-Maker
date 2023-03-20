// hardhat.config.js
require('@nomicfoundation/hardhat-toolbox');

const { PRIVATE_KEY, STAGING_ALCHEMY_KEY } = process.env;

module.exports = {
  solidity: '0.8.9',
  networks: {
    sepolia: {
      url: STAGING_ALCHEMY_KEY || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : ['0'.repeat(64)],
    },
  },
};

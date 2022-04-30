require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/tBXHomGe7wedXW0mvncz3tt9wMJURpNP',
      accounts: ['fa711b9ce40d6ab1137e05b0442392dae8a641e76f6256819bb2ac3875e59373'],
    },
  },
};

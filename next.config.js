const path = require('path');

module.exports = {
  reactStrictMode: true,
  resolve: {
    alias: {

      // Frontend
      '@Components': path.resolve(__dirname, 'src/components/'),
      '@Hooks': path.resolve(__dirname, 'src/hooks/'),
      '@Helpers': path.resolve(__dirname, 'src/helpers/'),
      '@Styles': path.resolve(__dirname, 'styles/'),

      // Blockchain Interaction
      '@Contracts': path.resolve(__dirname, 'lib/contracts/'),
      '@Abi': path.resolve(__dirname, 'lib/abi/')
    }
  },
  env: {
    ETHERSCAN_API_KEY: '9UDCU2SPGGJS5Y8ZXG6REFKPSMCC8HIPA6',
    CH_CONTRACT_ADDRESS: '0x858F9A195289B652D5fdF1A86Ec4dc55EB41F234'
  },
}

const path = require('path');

module.exports = {
  images: {
    domains: ['ipfs.io'],
  },
  webpack: (config) => {
    config.experiments = { topLevelAwait: true, layers: true };
    return config;
  },
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
    // CH_CONTRACT_ADDRESS: '0xE7210F48A39826478EaF190FbBc18FA2Fb7C740D'
    // CH_CONTRACT_ADDRESS: '0x15136fcB84140Df2aA8A75B2E2Fa1Be3cCAc4C02'
    CH_CONTRACT_ADDRESS: '0x58Fe5f75510585153d050d71BE6340cEAB084189'
  },
}

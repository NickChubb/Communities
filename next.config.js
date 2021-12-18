const path = require('path');

module.exports = {
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
    CH_CONTRACT_ADDRESS: '0x89A0796B7268eA7BaFe1DEfb8CB5F9Ad14aF84a4'
  },
}

const path = require('path');

module.exports = {
  reactStrictMode: true,
  resolve: {
    alias: {
      '@Components': path.resolve(__dirname, 'src/components/'),
      '@Hooks': path.resolve(__dirname, 'src/hooks/'),
      '@Helpers': path.resolve(__dirname, 'src/helpers/'),
      '@Styles': path.resolve(__dirname, 'styles/')
    }
  },
  env: {
    ETHERSCAN_API_KEY: '9UDCU2SPGGJS5Y8ZXG6REFKPSMCC8HIPA6',
  },
}

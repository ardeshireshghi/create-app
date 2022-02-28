const createCLIApp = require('../cli');
const env = require('./environment');

function createApp() {
  const app = createCLIApp();
  app.parse();
}

module.exports = createApp;

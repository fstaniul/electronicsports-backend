const chai = require('chai');
const loadConfig = require('./load-config');

chai.should();

describe('loads config file correctly', () => {
  it('Will load accounts-config for development', () => {
    process.env.NODE_ENV = 'development';
    const config = loadConfig('accounts-config');
    config.should.be.an('array');
  });
});

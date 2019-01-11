// e2e-conf.js
require('dotenv-flow').config();

exports.config = {
  sauceUser: String(process.env.SAUCE_USERNAME),
  sauceKey: String(process.env.SAUCE_ACCESS_KEY),
  specs: ['../e2e-tests/*test.js'],

  onPrepare: function () {
    browser.ignoreSynchronization = true;
  },

  multiCapabilities: [{
    browserName: 'chrome',
    screenResolution: '1280x1024',
    version: '71',
    platform: 'Windows 10',
    name: "chrome-tests",
    shardTestFiles: true,
    maxInstances: 5
  }],

}
// conf.js
// var HTTPSProxyAgent = require('https-proxy-agent');
// var sauceRestAgent = new HTTPSProxyAgent("http://<proxy>:<port>")

exports.config = {
  sauceUser: 'riesen007',
  sauceKey: 'f4be4c64-a565-4acf-9335-edb3ad2e7a15',
  // sauceAgent: sauceRestAgent,
  // webDriverProxy: 'http://<proxy>:<port>',
  //seleniumAddress: 'http://ondemand.saucelabs.com:80/wd/hub',
  specs: ['e2e-tests/*test.js'],

  // restartBrowserBetweenTests: true,

  onPrepare: function () {
    browser.ignoreSynchronization = true;
    var caps = browser.getCapabilities()
  },

  multiCapabilities: [{
    browserName: 'chrome',
    version: '71',
    platform: 'Windows 10',
    name: "chrome-tests",
    shardTestFiles: true,
    maxInstances: 5
  }],

  onComplete: function () {
    var printSessionId = function (jobName) {
      browser.getSession().then(function (session) {
        console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
      });
    }
    printSessionId("Insert Job Name Here");
  }
}
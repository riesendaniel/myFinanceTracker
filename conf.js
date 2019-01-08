require('dotenv-flow').config();
// conf.js

exports.config = {
  sauceUser: String(process.env.SAUCE_USERNAME),
  sauceKey: String(process.env.SAUCE_ACCESS_KEY),
  specs: ['e2e-tests/*test.js'],

  onPrepare: function () {
    browser.ignoreSynchronization = true;
    var caps = browser.getCapabilities()
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

  onComplete: function () {
    var printSessionId = function (jobName) {
      browser.getSession().then(function (session) {
        console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
      });
    }
    printSessionId("Insert Job Name Here");
  }
}
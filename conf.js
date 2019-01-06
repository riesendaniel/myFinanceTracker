// conf.js

exports.config = {
  sauceUser: 'riesen007',
  sauceKey: 'f4be4c64-a565-4acf-9335-edb3ad2e7a15',
  specs: ['e2e-tests/*test.js'],

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
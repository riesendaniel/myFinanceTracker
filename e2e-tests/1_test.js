// spec.js
describe('e2e Test myFinanceTracker', function () {
  it('it should open site', function () {
    browser.executeScript('sauce:context=Going to site');
    browser.get('http://danielriesen.ch');

    browser.executeScript('sauce:context=Click Login with Email');
    element(by.css('.firebaseui-idp-password')).click();

    browser.executeScript('sauce:context=Enter Emailadress');
    element(by.name('email')).sendKeys('riesen@yahoo.de');

    browser.executeScript('sauce:context=Click next');
    element(by.css('.firebaseui-id-submit')).click();

    browser.executeScript('sauce:context=Enter password');
    element(by.name('password')).sendKeys('Riesen');

    browser.executeScript('sauce:context=Click next');
    element(by.css('.firebaseui-id-submit')).click();

    browser.sleep(1000);
    browser.executeScript('sauce:context=Asserting \'Übersicht von riesen@yahoo.de\' welcome text is present');
    var titleDashboard = element(by.xpath('//*[@data-test-id=\'dashboard-title\']'));
    expect(titleDashboard.getText().toString().includes('Übersicht von'));
  });

  it('it should go to budget', function () {
    browser.executeScript('sauce:context=Click Budget');
    element(by.xpath('//*[@data-test-id=\'click-menu-Budget\']')).click();

    browser.executeScript('sauce:context=Asserting \'Budget\' text is present"');
    var titleBudget = element(by.xpath('//*[@data-test-id=\'title-budget\']'));
    expect(titleBudget.getText().toString().includes('Budget'));
  });

  it('it should go to outgoing', function () {
    browser.executeScript('sauce:context=Click Ausgaben');
    element(by.xpath('//*[@data-test-id=\'click-menu-Ausgaben\']')).click();

    browser.executeScript('sauce:context=Asserting \'Ausgaben\' text is present"');
    var titleOutgoing = element(by.xpath('//*[@data-test-id=\'title-outgoing\']'));
    expect(titleOutgoing.getText().toString().includes('Ausgaben'));
  });

  it('it should go to new outgoing', function () {
    browser.executeScript('sauce:context=Add new Outgoing');
    element(by.xpath('//*[@data-test-id=\'add-outgoing\']')).click();

    browser.executeScript('sauce:context=Asserting \'Ausgabe erfassen\' text is present"');
    var titleNewOutgoing = element(by.xpath('//*[@data-test-id=\'title-new-outgoing\']'));
    expect(titleNewOutgoing.getText().toString().includes('Ausgabe erfassen'));
  });

  it('it should add new outgoing site', function () {
    browser.executeScript('sauce:context=Enter title');
    element(by.id('outgoing-title')).sendKeys('automated test outgoing');

    browser.executeScript('sauce:context=Enter amount');
    element(by.id('amount')).sendKeys('100');

    browser.executeScript('sauce:context=click add');
    element(by.xpath('//*[@data-test-id=\'submit-button\']')).click();

    browser.executeScript('sauce:context=Asserting \'Ausgaben\' text is present"');
    var titleOutgoing = element(by.xpath('//*[@data-test-id=\'title-outgoing\']'));
    expect(titleOutgoing.getText().toString().includes('Ausgaben'));
  });
});
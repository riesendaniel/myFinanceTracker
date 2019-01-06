// spec.js
describe('e2e Test myFinanceTracker', function() {
  it('it should open site', function() {
    browser.executeScript("sauce:context=Going to site");
    browser.get('http://danielriesen.ch');

    browser.executeScript("sauce:context=Click Login with Email");
    element(by.css('.firebaseui-idp-password')).click();

    browser.executeScript("sauce:context=Enter Emailadress");
    element(by.name('email')).sendKeys('riesen@yahoo.de');

    browser.executeScript("sauce:context=Click next");
    element(by.css('.firebaseui-id-submit')).click();

    browser.executeScript("sauce:context=Enter password");
    element(by.name('password')).sendKeys('Riesen');

    browser.executeScript("sauce:context=Click next");
    element(by.css('.firebaseui-id-submit')).click();

    browser.sleep(1000);
    browser.executeScript("sauce:context=Asserting 'Übersicht von riesen@yahoo.de' welcome text is present");
    var title = element(by.id('dashboard-title'));
    expect(title.getText()).toEqual('Übersicht von riesen@yahoo.de');
  });
});
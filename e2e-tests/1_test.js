// spec.js
describe('e2e Test myFinanceTracker', function() {
  it('it should open site', function() {
    browser.executeScript("sauce:context=Going to site");
    browser.get('http://danielriesen.ch');

    browser.executeScript("sauce:context=Click Login with Email");
    element(by.css('.firebaseui-idp-password')).click();

    browser.executeScript("sauce:context=Enter Emailadress");
    element(by.name('email')).sendKeys('riesen@yahoo.de');

    browser.executeScript("sauce:context=Asserting 'riesen007@yahoo!' text is present");
    var email = element(by.name('email'));
    expect(email.getText()).toEqual('');
  });
});
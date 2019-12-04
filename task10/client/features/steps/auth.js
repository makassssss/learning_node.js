const assert = require('assert');
const { Given, When, Then } = require('cucumber');

Given('I navigate to {string}', function (url) {
    browser.url(url);
});

When('I enter my username {string} and password {string}', function (username, password) {
    $('#username').setValue(username);
    $('#password').setValue(password);
});

When('I submit the form', function () {
    $('input[type="submit"]').click();
});

Then('I should see the home page', function () {
    assert.equal(browser.getUrl(), 'http://localhost:3000/departments')
});

Then('I should be able to logout', function () {
    $('#log-out').click();
    assert.equal(browser.getUrl(), 'http://localhost:3000/login')
});

Then('I should see an error', function () {
    assert.equal($('.validation').getText(), 'Invalid username or password!');
});






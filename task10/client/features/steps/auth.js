const assert = require('assert');
const { Given, When, Then } = require('cucumber');

Given('I navigate to {string}', (url) => {
    browser.maximizeWindow();
    browser.url(url);
});

When('I enter my username {string} and password {string}', (username, password) => {
    $('#username').setValue(username);
    $('#password').setValue(password);
});

When('I submit the form', () => {
    $('input[type="submit"]').click();
});

Then('I should see the home page', () => {
    browser.waitUntil(() => {
        return browser.getUrl() === 'http://localhost:3000/departments'
    }, 1000, 'expected to see the home page');
});

Then('I should be able to logout', () => {
    $('#log-out').click();
    assert.equal(browser.getUrl(), 'http://localhost:3000/login')
});

Then('I should see an error', () => {
    assert.equal($('.validation').getText(), 'Invalid username or password!');
});






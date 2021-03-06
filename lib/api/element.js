// Generated by CoffeeScript 2.0.0-beta7
void function () {
  var cache$, deprecate, getElementWithoutError, hasType, truthy, waitForElement;
  cache$ = require('assertive');
  truthy = cache$.truthy;
  hasType = cache$.hasType;
  getElementWithoutError = require('./safeElement');
  deprecate = require('./deprecate');
  waitForElement = function (driver, selector, shouldBeVisible, timeout) {
    var element, foundElement, negate, start;
    if (null == timeout)
      timeout = 3e3;
    start = Date.now();
    driver.setElementTimeout(timeout);
    foundElement = null;
    while (Date.now() - start < timeout) {
      element = getElementWithoutError(driver, selector);
      if ((null != element ? element.isVisible() : void 0) === shouldBeVisible) {
        foundElement = element;
        break;
      }
    }
    driver.setElementTimeout(0);
    if (foundElement === null) {
      negate = shouldBeVisible ? '' : 'not ';
      throw new Error('Timeout (' + timeout + 'ms) waiting for element (' + selector + ') to ' + negate + 'be visible.');
    }
    return foundElement;
  };
  module.exports = function (driver) {
    return {
      getElement: function (selector) {
        hasType('getElement(selector) - requires (String) selector', String, selector);
        return getElementWithoutError(driver, selector);
      },
      getElements: function (selector) {
        hasType('getElements(selector) - requires (String) selector', String, selector);
        return driver.getElements(selector);
      },
      waitForElement: function (selector, timeout) {
        deprecate('waitForElement', 'waitForElementVisible');
        hasType('getElements(selector) - requires (String) selector', String, selector);
        return waitForElement(driver, selector, true, timeout);
      },
      waitForElementVisible: function (selector, timeout) {
        hasType('getElements(selector) - requires (String) selector', String, selector);
        return waitForElement(driver, selector, true, timeout);
      },
      waitForElementNotVisible: function (selector, timeout) {
        hasType('getElements(selector) - requires (String) selector', String, selector);
        return waitForElement(driver, selector, false, timeout);
      },
      click: function (selector) {
        var element;
        hasType('click(selector) - requires (String) selector', String, selector);
        element = driver.getElement(selector);
        truthy('Element not found at selector: ' + selector, element);
        return element.click();
      }
    };
  };
}.call(this);

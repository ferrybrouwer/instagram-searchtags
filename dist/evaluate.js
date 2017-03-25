'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('./helpers');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const evaluate = {

  /**
   * Open login form page
   *
   * @param {Object}        page
   * @return {String}    `success` or `failed`
   */
  openLoginForm(page) {
    return _asyncToGenerator(function* () {
      const evaluate = function () {
        var _ref = _asyncToGenerator(function* () {
          return yield page.open('https://www.instagram.com/accounts/login');
        });

        return function evaluate() {
          return _ref.apply(this, arguments);
        };
      }();
      return yield (0, _helpers.evaluateWithTimeout)(evaluate, function (value) {
        return value === 'success';
      });
    })();
  },

  /**
   * Open tag page
   *
   * @param   {Object}        page
   * @param   {String}        tag
   * @param   {String|null}   maxId
   * @return  {String} `success` or `failed`
   */
  openTagPage(page, tag, maxId = null) {
    return _asyncToGenerator(function* () {
      let url = `https://www.instagram.com/explore/tags/${tag}/?__a=1`;
      if (typeof maxId === 'string' && maxId.length > 0) {
        url += `&max_id=${maxId}`;
      }
      const evaluate = function () {
        var _ref2 = _asyncToGenerator(function* () {
          return yield page.open(url);
        });

        return function evaluate() {
          return _ref2.apply(this, arguments);
        };
      }();
      return yield (0, _helpers.evaluateWithTimeout)(evaluate, function (value) {
        return value === 'success';
      });
    })();
  },

  /**
   * Get state if current page has a login form
   *
   * @param {Object}    page
   * @return {Boolean}
   */
  hasLoginForm(page) {
    return _asyncToGenerator(function* () {
      const evaluate = function () {
        var _ref3 = _asyncToGenerator(function* () {
          return yield page.evaluate(function () {
            return document.querySelector('input[name="username"]') !== null && document.querySelector('input[name="password"]') !== null;
          });
        });

        return function evaluate() {
          return _ref3.apply(this, arguments);
        };
      }();
      return yield (0, _helpers.evaluateWithTimeout)(evaluate, function (value) {
        return value === true;
      });
    })();
  },

  /**
   * Submit the login form
   *
   * @param  {String} username
   * @param  {String} password
   * @return {Promise}
   */
  submitLoginForm(page, username, password) {
    return page.evaluate(function (username, password) {
      const event = new Event('input', { bubbles: true });
      const form = document.querySelector('form');
      const inputUsername = form.querySelector('input[name="username"]');
      const inputPassword = form.querySelector('input[name="password"]');
      const button = form.querySelector('button');

      inputUsername.value = username;
      inputUsername.dispatchEvent(event);

      inputPassword.value = password;
      inputPassword.dispatchEvent(event);

      button.click();
    }, username, password);
  },

  /**
   * Get page after submit
   *
   * @return {String}
   */
  getPageAfterSubmit(page) {
    return _asyncToGenerator(function* () {
      const evaluate = function () {
        var _ref4 = _asyncToGenerator(function* () {
          return yield page.evaluate(function () {
            return typeof _sharedData === 'object' ? Object.keys(_sharedData.entry_data)[0] : 'LoginAndSignupPage';
          });
        });

        return function evaluate() {
          return _ref4.apply(this, arguments);
        };
      }();

      return yield (0, _helpers.evaluateWithTimeout)(evaluate, function (value) {
        return value !== 'LoginAndSignupPage';
      });
    })();
  },

  /**
   * Get body json
   *
   * @return {Object|false}
   */
  getJson(page) {
    return _asyncToGenerator(function* () {
      const evaluate = function () {
        var _ref5 = _asyncToGenerator(function* () {
          return yield page.evaluate(function () {
            const pre = document.querySelector('body > pre');
            const body = pre && pre.innerHTML;
            var json = false;
            try {
              json = JSON.parse(body);
            } catch (err) {}
            return json;
          });
        });

        return function evaluate() {
          return _ref5.apply(this, arguments);
        };
      }();

      return yield (0, _helpers.evaluateWithTimeout)(evaluate, function (value) {
        return typeof value === 'object';
      });
    })();
  }
};

exports.default = evaluate;
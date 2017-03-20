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
   * @param   {Object}  page
   * @param   {String}  tag
   * @return  {String} `success` or `failed`
   */
  openTagPage(page, tag) {
    return _asyncToGenerator(function* () {
      const evaluate = function () {
        var _ref2 = _asyncToGenerator(function* () {
          return yield page.open(`https://www.instagram.com/explore/tags/${tag}/?__a=1`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ldmFsdWF0ZS5qcyJdLCJuYW1lcyI6WyJldmFsdWF0ZSIsIm9wZW5Mb2dpbkZvcm0iLCJwYWdlIiwib3BlbiIsInZhbHVlIiwib3BlblRhZ1BhZ2UiLCJ0YWciLCJoYXNMb2dpbkZvcm0iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzdWJtaXRMb2dpbkZvcm0iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiZXZlbnQiLCJFdmVudCIsImJ1YmJsZXMiLCJmb3JtIiwiaW5wdXRVc2VybmFtZSIsImlucHV0UGFzc3dvcmQiLCJidXR0b24iLCJkaXNwYXRjaEV2ZW50IiwiY2xpY2siLCJnZXRQYWdlQWZ0ZXJTdWJtaXQiLCJfc2hhcmVkRGF0YSIsIk9iamVjdCIsImtleXMiLCJlbnRyeV9kYXRhIiwiZ2V0SnNvbiIsInByZSIsImJvZHkiLCJpbm5lckhUTUwiLCJqc29uIiwiSlNPTiIsInBhcnNlIiwiZXJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUVBLE1BQU1BLFdBQVc7O0FBRWY7Ozs7OztBQU1NQyxlQUFOLENBQW9CQyxJQUFwQixFQUEwQjtBQUFBO0FBQ3hCLFlBQU1GO0FBQUEscUNBQVc7QUFBQSxpQkFBVyxNQUFNRSxLQUFLQyxJQUFMLENBQVUsMENBQVYsQ0FBakI7QUFBQSxTQUFYOztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQU47QUFDQSxhQUFPLE1BQU0sa0NBQW9CSCxRQUFwQixFQUE4QixVQUFDSSxLQUFEO0FBQUEsZUFDeENBLFVBQVUsU0FEOEI7QUFBQSxPQUE5QixDQUFiO0FBRndCO0FBSXpCLEdBWmM7O0FBY2Y7Ozs7Ozs7QUFPTUMsYUFBTixDQUFrQkgsSUFBbEIsRUFBd0JJLEdBQXhCLEVBQTZCO0FBQUE7QUFDM0IsWUFBTU47QUFBQSxzQ0FBVztBQUFBLGlCQUFXLE1BQU1FLEtBQUtDLElBQUwsQ0FBVywwQ0FBeUNHLEdBQUksU0FBeEQsQ0FBakI7QUFBQSxTQUFYOztBQUFBO0FBQUE7QUFBQTtBQUFBLFNB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QXBCLEVBQThCLFVBQUNJLEtBQUQ7QUFBQSxlQUFXLE9BQU9BLEtBQVAsS0FBaUIsUUFBNUI7QUFBQSxPQUE5QixDQUFiO0FBWGtCO0FBWW5CO0FBL0ZjLENBQWpCOztrQkFrR2VKLFEiLCJmaWxlIjoiZXZhbHVhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2V2YWx1YXRlV2l0aFRpbWVvdXR9IGZyb20gJy4vaGVscGVycydcblxuY29uc3QgZXZhbHVhdGUgPSB7XG5cbiAgLyoqXG4gICAqIE9wZW4gbG9naW4gZm9ybSBwYWdlXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgcGFnZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9ICAgIGBzdWNjZXNzYCBvciBgZmFpbGVkYFxuICAgKi9cbiAgYXN5bmMgb3BlbkxvZ2luRm9ybShwYWdlKSB7XG4gICAgY29uc3QgZXZhbHVhdGUgPSBhc3luYygpID0+IGF3YWl0IHBhZ2Uub3BlbignaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9hY2NvdW50cy9sb2dpbicpXG4gICAgcmV0dXJuIGF3YWl0IGV2YWx1YXRlV2l0aFRpbWVvdXQoZXZhbHVhdGUsICh2YWx1ZSkgPT5cbiAgICAgICh2YWx1ZSA9PT0gJ3N1Y2Nlc3MnKSlcbiAgfSxcblxuICAvKipcbiAgICogT3BlbiB0YWcgcGFnZVxuICAgKlxuICAgKiBAcGFyYW0gICB7T2JqZWN0fSAgcGFnZVxuICAgKiBAcGFyYW0gICB7U3RyaW5nfSAgdGFnXG4gICAqIEByZXR1cm4gIHtTdHJpbmd9IGBzdWNjZXNzYCBvciBgZmFpbGVkYFxuICAgKi9cbiAgYXN5bmMgb3BlblRhZ1BhZ2UocGFnZSwgdGFnKSB7XG4gICAgY29uc3QgZXZhbHVhdGUgPSBhc3luYygpID0+IGF3YWl0IHBhZ2Uub3BlbihgaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9leHBsb3JlL3RhZ3MvJHt0YWd9Lz9fX2E9MWApXG4gICAgcmV0dXJuIGF3YWl0IGV2YWx1YXRlV2l0aFRpbWVvdXQoZXZhbHVhdGUsICh2YWx1ZSkgPT4gKHZhbHVlID09PSAnc3VjY2VzcycpKVxuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgc3RhdGUgaWYgY3VycmVudCBwYWdlIGhhcyBhIGxvZ2luIGZvcm1cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgIHBhZ2VcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGFzeW5jIGhhc0xvZ2luRm9ybShwYWdlKSB7XG4gICAgY29uc3QgZXZhbHVhdGUgPSBhc3luYygpID0+IGF3YWl0IHBhZ2UuZXZhbHVhdGUoKCkgPT4gKFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInVzZXJuYW1lXCJdJykgIT09IG51bGwgJiZcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpICE9PSBudWxsXG4gICAgKSlcbiAgICByZXR1cm4gYXdhaXQgZXZhbHVhdGVXaXRoVGltZW91dChldmFsdWF0ZSwgKHZhbHVlKSA9PiB2YWx1ZSA9PT0gdHJ1ZSlcbiAgfSxcblxuICAvKipcbiAgICogU3VibWl0IHRoZSBsb2dpbiBmb3JtXG4gICAqXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdXNlcm5hbWVcbiAgICogQHBhcmFtICB7U3RyaW5nfSBwYXNzd29yZFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgKi9cbiAgc3VibWl0TG9naW5Gb3JtKHBhZ2UsIHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgIHJldHVybiBwYWdlLmV2YWx1YXRlKCh1c2VybmFtZSwgcGFzc3dvcmQpID0+IHtcbiAgICAgIGNvbnN0IGV2ZW50ICAgICAgICAgPSBuZXcgRXZlbnQoJ2lucHV0Jywge2J1YmJsZXM6IHRydWV9KVxuICAgICAgY29uc3QgZm9ybSAgICAgICAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKVxuICAgICAgY29uc3QgaW5wdXRVc2VybmFtZSA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInVzZXJuYW1lXCJdJylcbiAgICAgIGNvbnN0IGlucHV0UGFzc3dvcmQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpXG4gICAgICBjb25zdCBidXR0b24gICAgICAgID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b24nKVxuXG4gICAgICBpbnB1dFVzZXJuYW1lLnZhbHVlID0gdXNlcm5hbWVcbiAgICAgIGlucHV0VXNlcm5hbWUuZGlzcGF0Y2hFdmVudChldmVudClcblxuICAgICAgaW5wdXRQYXNzd29yZC52YWx1ZSA9IHBhc3N3b3JkXG4gICAgICBpbnB1dFBhc3N3b3JkLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG5cbiAgICAgIGJ1dHRvbi5jbGljaygpXG4gICAgfSwgdXNlcm5hbWUsIHBhc3N3b3JkKVxuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgcGFnZSBhZnRlciBzdWJtaXRcbiAgICpcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgYXN5bmMgZ2V0UGFnZUFmdGVyU3VibWl0KHBhZ2UpIHtcbiAgICBjb25zdCBldmFsdWF0ZSA9IGFzeW5jKCkgPT4gYXdhaXQgcGFnZS5ldmFsdWF0ZSgoKSA9PiB7XG4gICAgICByZXR1cm4gdHlwZW9mIF9zaGFyZWREYXRhID09PSAnb2JqZWN0JyA/IE9iamVjdC5rZXlzKF9zaGFyZWREYXRhLmVudHJ5X2RhdGEpWzBdIDogJ0xvZ2luQW5kU2lnbnVwUGFnZSdcbiAgICB9KVxuXG4gICAgcmV0dXJuIGF3YWl0IGV2YWx1YXRlV2l0aFRpbWVvdXQoZXZhbHVhdGUsICh2YWx1ZSkgPT4gdmFsdWUgIT09ICdMb2dpbkFuZFNpZ251cFBhZ2UnKVxuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgYm9keSBqc29uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdHxmYWxzZX1cbiAgICovXG4gIGFzeW5jIGdldEpzb24ocGFnZSkge1xuICAgIGNvbnN0IGV2YWx1YXRlID0gYXN5bmMoKSA9PiBhd2FpdCBwYWdlLmV2YWx1YXRlKCgpID0+IHtcbiAgICAgIGNvbnN0IHByZSAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5ID4gcHJlJylcbiAgICAgIGNvbnN0IGJvZHkgPSBwcmUgJiYgcHJlLmlubmVySFRNTFxuICAgICAgdmFyIGpzb24gPSBmYWxzZVxuICAgICAgdHJ5IHtcbiAgICAgICAganNvbiA9IEpTT04ucGFyc2UoYm9keSlcbiAgICAgIH0gY2F0Y2ggKGVycikge31cbiAgICAgIHJldHVybiBqc29uXG4gICAgfSlcblxuICAgIHJldHVybiBhd2FpdCBldmFsdWF0ZVdpdGhUaW1lb3V0KGV2YWx1YXRlLCAodmFsdWUpID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZXZhbHVhdGVcbiJdfQ==
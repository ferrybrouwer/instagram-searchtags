'use strict';

var _phantom = require('phantom');

var _phantom2 = _interopRequireDefault(_phantom);

var _evaluate = require('./evaluate');

var _evaluate2 = _interopRequireDefault(_evaluate);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const logger = (0, _debug2.default)('instagramsearchtags');

_phantom2.default.cookiesEnabled = true;
_phantom2.default.javascriptEnabled = true;

const facade = function () {
  var _ref = _asyncToGenerator(function* ({ username, password, tag }) {
    let json = false;

    // create page
    const instance = yield _phantom2.default.create();
    let page = yield instance.createPage();

    // set page settings...
    page.setting('userAgent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36');
    page.setting('javascriptEnabled', true);
    page.setting('loadImages', false);

    // open login page
    logger('Open login page...');
    const statusOpenLoginPage = yield _evaluate2.default.openLoginForm(page);
    if (statusOpenLoginPage !== 'success') {
      throw new Error(`Search for login page result in status: ${statusOpenLoginPage}`);
    }
    logger('Successfull open login page!');

    // check if login form exists
    logger('Validate inputfields login form...');
    const formExists = yield _evaluate2.default.hasLoginForm(page);
    if (!formExists) {
      throw new Error(`Can not find a login form in login page`);
    }
    logger('Successfull found login form!');

    // Fill in credentials and submit login form
    logger('Fill in credentials and submit login form...');
    yield _evaluate2.default.submitLoginForm(page, username, password);

    // Validate next page after login
    logger('Wait until page is submitted and check if page is not the login page...');
    const pageAfterLogin = yield _evaluate2.default.getPageAfterSubmit(page);
    if (pageAfterLogin === 'LoginAndSignupPage') {
      throw new Error(`Can not login on Instagram with given credentials`);
    }
    logger('Successfull logged in!');

    // create new page
    page = yield instance.createPage();

    // Open explore tag page
    logger('Open explore tag page...');
    const statusExploreTagPage = yield _evaluate2.default.openTagPage(page, tag);
    if (statusExploreTagPage !== 'success') {
      throw new Error(`Can not open explore tags page`);
    }
    logger('Successfull opened explore tags page!');

    // Get json of explore tags
    logger('Get json object from explore tags page...');
    json = yield _evaluate2.default.getJson(page);
    if (typeof json !== 'object') {
      throw new Error(`Can not fetch json object from explore tags page`);
    }
    logger('Successfull fetched data %j', json);

    // exit phantom instance
    yield instance.exit();

    return json;
  });

  return function facade(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = facade;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mYWNhZGUuanMiXSwibmFtZXMiOlsibG9nZ2VyIiwiY29va2llc0VuYWJsZWQiLCJqYXZhc2NyaXB0RW5hYmxlZCIsImZhY2FkZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJ0YWciLCJqc29uIiwiaW5zdGFuY2UiLCJjcmVhdGUiLCJwYWdlIiwiY3JlYXRlUGFnZSIsInNldHRpbmciLCJzdGF0dXNPcGVuTG9naW5QYWdlIiwib3BlbkxvZ2luRm9ybSIsIkVycm9yIiwiZm9ybUV4aXN0cyIsImhhc0xvZ2luRm9ybSIsInN1Ym1pdExvZ2luRm9ybSIsInBhZ2VBZnRlckxvZ2luIiwiZ2V0UGFnZUFmdGVyU3VibWl0Iiwic3RhdHVzRXhwbG9yZVRhZ1BhZ2UiLCJvcGVuVGFnUGFnZSIsImdldEpzb24iLCJleGl0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsTUFBTUEsU0FBUyxxQkFBTSxxQkFBTixDQUFmOztBQUVBLGtCQUFRQyxjQUFSLEdBQTRCLElBQTVCO0FBQ0Esa0JBQVFDLGlCQUFSLEdBQTRCLElBQTVCOztBQUVBLE1BQU1DO0FBQUEsK0JBQVMsV0FBTSxFQUFDQyxRQUFELEVBQVdDLFFBQVgsRUFBcUJDLEdBQXJCLEVBQU4sRUFBb0M7QUFDakQsUUFBSUMsT0FBTyxLQUFYOztBQUVBO0FBQ0EsVUFBTUMsV0FBVyxNQUFNLGtCQUFRQyxNQUFSLEVBQXZCO0FBQ0EsUUFBSUMsT0FBYSxNQUFNRixTQUFTRyxVQUFULEVBQXZCOztBQUVBO0FBQ0FELFNBQUtFLE9BQUwsQ0FBYSxXQUFiLEVBQTBCLGdIQUExQjtBQUNBRixTQUFLRSxPQUFMLENBQWEsbUJBQWIsRUFBa0MsSUFBbEM7QUFDQUYsU0FBS0UsT0FBTCxDQUFhLFlBQWIsRUFBMkIsS0FBM0I7O0FBRUE7QUFDQVosV0FBTyxvQkFBUDtBQUNBLFVBQU1hLHNCQUFzQixNQUFNLG1CQUFTQyxhQUFULENBQXVCSixJQUF2QixDQUFsQztBQUNBLFFBQUlHLHdCQUF3QixTQUE1QixFQUF1QztBQUNyQyxZQUFNLElBQUlFLEtBQUosQ0FBVywyQ0FBMENGLG1CQUFvQixFQUF6RSxDQUFOO0FBQ0Q7QUFDRGIsV0FBTyw4QkFBUDs7QUFFQTtBQUNBQSxXQUFPLG9DQUFQO0FBQ0EsVUFBTWdCLGFBQWEsTUFBTSxtQkFBU0MsWUFBVCxDQUFzQlAsSUFBdEIsQ0FBekI7QUFDQSxRQUFJLENBQUNNLFVBQUwsRUFBaUI7QUFDZixZQUFNLElBQUlELEtBQUosQ0FBVyx5Q0FBWCxDQUFOO0FBQ0Q7QUFDRGYsV0FBTywrQkFBUDs7QUFFQTtBQUNBQSxXQUFPLDhDQUFQO0FBQ0EsVUFBTSxtQkFBU2tCLGVBQVQsQ0FBeUJSLElBQXpCLEVBQStCTixRQUEvQixFQUF5Q0MsUUFBekMsQ0FBTjs7QUFFQTtBQUNBTCxXQUFPLHlFQUFQO0FBQ0EsVUFBTW1CLGlCQUFpQixNQUFNLG1CQUFTQyxrQkFBVCxDQUE0QlYsSUFBNUIsQ0FBN0I7QUFDQSxRQUFJUyxtQkFBbUIsb0JBQXZCLEVBQTZDO0FBQzNDLFlBQU0sSUFBSUosS0FBSixDQUFXLG1EQUFYLENBQU47QUFDRDtBQUNEZixXQUFPLHdCQUFQOztBQUVBO0FBQ0FVLFdBQU8sTUFBTUYsU0FBU0csVUFBVCxFQUFiOztBQUVBO0FBQ0FYLFdBQU8sMEJBQVA7QUFDQSxVQUFNcUIsdUJBQXVCLE1BQU0sbUJBQVNDLFdBQVQsQ0FBcUJaLElBQXJCLEVBQTJCSixHQUEzQixDQUFuQztBQUNBLFFBQUllLHlCQUF5QixTQUE3QixFQUF3QztBQUN0QyxZQUFNLElBQUlOLEtBQUosQ0FBVyxnQ0FBWCxDQUFOO0FBQ0Q7QUFDRGYsV0FBTyx1Q0FBUDs7QUFFQTtBQUNBQSxXQUFPLDJDQUFQO0FBQ0FPLFdBQU8sTUFBTSxtQkFBU2dCLE9BQVQsQ0FBaUJiLElBQWpCLENBQWI7QUFDQSxRQUFJLE9BQU9ILElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUIsWUFBTSxJQUFJUSxLQUFKLENBQVcsa0RBQVgsQ0FBTjtBQUNEO0FBQ0RmLFdBQU8sNkJBQVAsRUFBc0NPLElBQXRDOztBQUVBO0FBQ0EsVUFBTUMsU0FBU2dCLElBQVQsRUFBTjs7QUFFQSxXQUFPakIsSUFBUDtBQUNELEdBL0RLOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBaUVBa0IsT0FBT0MsT0FBUCxHQUFpQnZCLE1BQWpCIiwiZmlsZSI6ImZhY2FkZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwaGFudG9tIGZyb20gJ3BoYW50b20nXG5pbXBvcnQgZXZhbHVhdGUgZnJvbSAnLi9ldmFsdWF0ZSdcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1ZydcblxuY29uc3QgbG9nZ2VyID0gZGVidWcoJ2luc3RhZ3JhbXNlYXJjaHRhZ3MnKVxuXG5waGFudG9tLmNvb2tpZXNFbmFibGVkICAgID0gdHJ1ZTtcbnBoYW50b20uamF2YXNjcmlwdEVuYWJsZWQgPSB0cnVlO1xuXG5jb25zdCBmYWNhZGUgPSBhc3luYyh7dXNlcm5hbWUsIHBhc3N3b3JkLCB0YWd9KSA9PiB7XG4gIGxldCBqc29uID0gZmFsc2VcblxuICAvLyBjcmVhdGUgcGFnZVxuICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHBoYW50b20uY3JlYXRlKClcbiAgbGV0IHBhZ2UgICAgICAgPSBhd2FpdCBpbnN0YW5jZS5jcmVhdGVQYWdlKClcblxuICAvLyBzZXQgcGFnZSBzZXR0aW5ncy4uLlxuICBwYWdlLnNldHRpbmcoJ3VzZXJBZ2VudCcsICdNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXT1c2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzQ0LjAuMjQwMy4xNTcgU2FmYXJpLzUzNy4zNicpXG4gIHBhZ2Uuc2V0dGluZygnamF2YXNjcmlwdEVuYWJsZWQnLCB0cnVlKVxuICBwYWdlLnNldHRpbmcoJ2xvYWRJbWFnZXMnLCBmYWxzZSlcblxuICAvLyBvcGVuIGxvZ2luIHBhZ2VcbiAgbG9nZ2VyKCdPcGVuIGxvZ2luIHBhZ2UuLi4nKVxuICBjb25zdCBzdGF0dXNPcGVuTG9naW5QYWdlID0gYXdhaXQgZXZhbHVhdGUub3BlbkxvZ2luRm9ybShwYWdlKVxuICBpZiAoc3RhdHVzT3BlbkxvZ2luUGFnZSAhPT0gJ3N1Y2Nlc3MnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBTZWFyY2ggZm9yIGxvZ2luIHBhZ2UgcmVzdWx0IGluIHN0YXR1czogJHtzdGF0dXNPcGVuTG9naW5QYWdlfWApXG4gIH1cbiAgbG9nZ2VyKCdTdWNjZXNzZnVsbCBvcGVuIGxvZ2luIHBhZ2UhJylcblxuICAvLyBjaGVjayBpZiBsb2dpbiBmb3JtIGV4aXN0c1xuICBsb2dnZXIoJ1ZhbGlkYXRlIGlucHV0ZmllbGRzIGxvZ2luIGZvcm0uLi4nKVxuICBjb25zdCBmb3JtRXhpc3RzID0gYXdhaXQgZXZhbHVhdGUuaGFzTG9naW5Gb3JtKHBhZ2UpXG4gIGlmICghZm9ybUV4aXN0cykge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCBmaW5kIGEgbG9naW4gZm9ybSBpbiBsb2dpbiBwYWdlYClcbiAgfVxuICBsb2dnZXIoJ1N1Y2Nlc3NmdWxsIGZvdW5kIGxvZ2luIGZvcm0hJylcblxuICAvLyBGaWxsIGluIGNyZWRlbnRpYWxzIGFuZCBzdWJtaXQgbG9naW4gZm9ybVxuICBsb2dnZXIoJ0ZpbGwgaW4gY3JlZGVudGlhbHMgYW5kIHN1Ym1pdCBsb2dpbiBmb3JtLi4uJylcbiAgYXdhaXQgZXZhbHVhdGUuc3VibWl0TG9naW5Gb3JtKHBhZ2UsIHVzZXJuYW1lLCBwYXNzd29yZClcblxuICAvLyBWYWxpZGF0ZSBuZXh0IHBhZ2UgYWZ0ZXIgbG9naW5cbiAgbG9nZ2VyKCdXYWl0IHVudGlsIHBhZ2UgaXMgc3VibWl0dGVkIGFuZCBjaGVjayBpZiBwYWdlIGlzIG5vdCB0aGUgbG9naW4gcGFnZS4uLicpXG4gIGNvbnN0IHBhZ2VBZnRlckxvZ2luID0gYXdhaXQgZXZhbHVhdGUuZ2V0UGFnZUFmdGVyU3VibWl0KHBhZ2UpXG4gIGlmIChwYWdlQWZ0ZXJMb2dpbiA9PT0gJ0xvZ2luQW5kU2lnbnVwUGFnZScpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbiBub3QgbG9naW4gb24gSW5zdGFncmFtIHdpdGggZ2l2ZW4gY3JlZGVudGlhbHNgKVxuICB9XG4gIGxvZ2dlcignU3VjY2Vzc2Z1bGwgbG9nZ2VkIGluIScpXG5cbiAgLy8gY3JlYXRlIG5ldyBwYWdlXG4gIHBhZ2UgPSBhd2FpdCBpbnN0YW5jZS5jcmVhdGVQYWdlKClcblxuICAvLyBPcGVuIGV4cGxvcmUgdGFnIHBhZ2VcbiAgbG9nZ2VyKCdPcGVuIGV4cGxvcmUgdGFnIHBhZ2UuLi4nKVxuICBjb25zdCBzdGF0dXNFeHBsb3JlVGFnUGFnZSA9IGF3YWl0IGV2YWx1YXRlLm9wZW5UYWdQYWdlKHBhZ2UsIHRhZylcbiAgaWYgKHN0YXR1c0V4cGxvcmVUYWdQYWdlICE9PSAnc3VjY2VzcycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbiBub3Qgb3BlbiBleHBsb3JlIHRhZ3MgcGFnZWApXG4gIH1cbiAgbG9nZ2VyKCdTdWNjZXNzZnVsbCBvcGVuZWQgZXhwbG9yZSB0YWdzIHBhZ2UhJylcblxuICAvLyBHZXQganNvbiBvZiBleHBsb3JlIHRhZ3NcbiAgbG9nZ2VyKCdHZXQganNvbiBvYmplY3QgZnJvbSBleHBsb3JlIHRhZ3MgcGFnZS4uLicpXG4gIGpzb24gPSBhd2FpdCBldmFsdWF0ZS5nZXRKc29uKHBhZ2UpXG4gIGlmICh0eXBlb2YganNvbiAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbiBub3QgZmV0Y2gganNvbiBvYmplY3QgZnJvbSBleHBsb3JlIHRhZ3MgcGFnZWApXG4gIH1cbiAgbG9nZ2VyKCdTdWNjZXNzZnVsbCBmZXRjaGVkIGRhdGEgJWonLCBqc29uKVxuXG4gIC8vIGV4aXQgcGhhbnRvbSBpbnN0YW5jZVxuICBhd2FpdCBpbnN0YW5jZS5leGl0KCk7XG5cbiAgcmV0dXJuIGpzb25cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmYWNhZGVcbiJdfQ==
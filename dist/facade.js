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
    let error = false;

    // create phantomjs instance
    const instance = yield _phantom2.default.create();

    try {
      // create page
      let page = yield instance.createPage();
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
    } catch (err) {
      error = err;
    }

    // force exit phantom instance
    yield instance.exit();

    // throws error if exists
    if (error instanceof Error) {
      throw error;
    }

    return json;
  });

  return function facade(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = facade;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mYWNhZGUuanMiXSwibmFtZXMiOlsibG9nZ2VyIiwiY29va2llc0VuYWJsZWQiLCJqYXZhc2NyaXB0RW5hYmxlZCIsImZhY2FkZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJ0YWciLCJqc29uIiwiZXJyb3IiLCJpbnN0YW5jZSIsImNyZWF0ZSIsInBhZ2UiLCJjcmVhdGVQYWdlIiwic2V0dGluZyIsInN0YXR1c09wZW5Mb2dpblBhZ2UiLCJvcGVuTG9naW5Gb3JtIiwiRXJyb3IiLCJmb3JtRXhpc3RzIiwiaGFzTG9naW5Gb3JtIiwic3VibWl0TG9naW5Gb3JtIiwicGFnZUFmdGVyTG9naW4iLCJnZXRQYWdlQWZ0ZXJTdWJtaXQiLCJzdGF0dXNFeHBsb3JlVGFnUGFnZSIsIm9wZW5UYWdQYWdlIiwiZ2V0SnNvbiIsImVyciIsImV4aXQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxTQUFTLHFCQUFNLHFCQUFOLENBQWY7O0FBRUEsa0JBQVFDLGNBQVIsR0FBNEIsSUFBNUI7QUFDQSxrQkFBUUMsaUJBQVIsR0FBNEIsSUFBNUI7O0FBRUEsTUFBTUM7QUFBQSwrQkFBUyxXQUFNLEVBQUNDLFFBQUQsRUFBV0MsUUFBWCxFQUFxQkMsR0FBckIsRUFBTixFQUFvQztBQUNqRCxRQUFJQyxPQUFRLEtBQVo7QUFDQSxRQUFJQyxRQUFRLEtBQVo7O0FBRUE7QUFDQSxVQUFNQyxXQUFXLE1BQU0sa0JBQVFDLE1BQVIsRUFBdkI7O0FBRUEsUUFBSTtBQUNGO0FBQ0EsVUFBSUMsT0FBTyxNQUFNRixTQUFTRyxVQUFULEVBQWpCO0FBQ0FELFdBQUtFLE9BQUwsQ0FBYSxXQUFiLEVBQTBCLGdIQUExQjtBQUNBRixXQUFLRSxPQUFMLENBQWEsbUJBQWIsRUFBa0MsSUFBbEM7QUFDQUYsV0FBS0UsT0FBTCxDQUFhLFlBQWIsRUFBMkIsS0FBM0I7O0FBRUE7QUFDQWIsYUFBTyxvQkFBUDtBQUNBLFlBQU1jLHNCQUFzQixNQUFNLG1CQUFTQyxhQUFULENBQXVCSixJQUF2QixDQUFsQztBQUNBLFVBQUlHLHdCQUF3QixTQUE1QixFQUF1QztBQUNyQyxjQUFNLElBQUlFLEtBQUosQ0FBVywyQ0FBMENGLG1CQUFvQixFQUF6RSxDQUFOO0FBQ0Q7QUFDRGQsYUFBTyw4QkFBUDs7QUFFQTtBQUNBQSxhQUFPLG9DQUFQO0FBQ0EsWUFBTWlCLGFBQWEsTUFBTSxtQkFBU0MsWUFBVCxDQUFzQlAsSUFBdEIsQ0FBekI7QUFDQSxVQUFJLENBQUNNLFVBQUwsRUFBaUI7QUFDZixjQUFNLElBQUlELEtBQUosQ0FBVyx5Q0FBWCxDQUFOO0FBQ0Q7QUFDRGhCLGFBQU8sK0JBQVA7O0FBRUE7QUFDQUEsYUFBTyw4Q0FBUDtBQUNBLFlBQU0sbUJBQVNtQixlQUFULENBQXlCUixJQUF6QixFQUErQlAsUUFBL0IsRUFBeUNDLFFBQXpDLENBQU47O0FBRUE7QUFDQUwsYUFBTyx5RUFBUDtBQUNBLFlBQU1vQixpQkFBaUIsTUFBTSxtQkFBU0Msa0JBQVQsQ0FBNEJWLElBQTVCLENBQTdCO0FBQ0EsVUFBSVMsbUJBQW1CLG9CQUF2QixFQUE2QztBQUMzQyxjQUFNLElBQUlKLEtBQUosQ0FBVyxtREFBWCxDQUFOO0FBQ0Q7QUFDRGhCLGFBQU8sd0JBQVA7O0FBRUE7QUFDQVcsYUFBTyxNQUFNRixTQUFTRyxVQUFULEVBQWI7O0FBRUE7QUFDQVosYUFBTywwQkFBUDtBQUNBLFlBQU1zQix1QkFBdUIsTUFBTSxtQkFBU0MsV0FBVCxDQUFxQlosSUFBckIsRUFBMkJMLEdBQTNCLENBQW5DO0FBQ0EsVUFBSWdCLHlCQUF5QixTQUE3QixFQUF3QztBQUN0QyxjQUFNLElBQUlOLEtBQUosQ0FBVyxnQ0FBWCxDQUFOO0FBQ0Q7QUFDRGhCLGFBQU8sdUNBQVA7O0FBRUE7QUFDQUEsYUFBTywyQ0FBUDtBQUNBTyxhQUFPLE1BQU0sbUJBQVNpQixPQUFULENBQWlCYixJQUFqQixDQUFiO0FBQ0EsVUFBSSxPQUFPSixJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzVCLGNBQU0sSUFBSVMsS0FBSixDQUFXLGtEQUFYLENBQU47QUFDRDtBQUNEaEIsYUFBTyw2QkFBUCxFQUFzQ08sSUFBdEM7QUFDRCxLQXJERCxDQXFERSxPQUFPa0IsR0FBUCxFQUFZO0FBQ1pqQixjQUFRaUIsR0FBUjtBQUNEOztBQUVEO0FBQ0EsVUFBTWhCLFNBQVNpQixJQUFULEVBQU47O0FBRUE7QUFDQSxRQUFJbEIsaUJBQWlCUSxLQUFyQixFQUE0QjtBQUMxQixZQUFNUixLQUFOO0FBQ0Q7O0FBRUQsV0FBT0QsSUFBUDtBQUNELEdBekVLOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBMkVBb0IsT0FBT0MsT0FBUCxHQUFpQnpCLE1BQWpCIiwiZmlsZSI6ImZhY2FkZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwaGFudG9tIGZyb20gJ3BoYW50b20nXG5pbXBvcnQgZXZhbHVhdGUgZnJvbSAnLi9ldmFsdWF0ZSdcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1ZydcblxuY29uc3QgbG9nZ2VyID0gZGVidWcoJ2luc3RhZ3JhbXNlYXJjaHRhZ3MnKVxuXG5waGFudG9tLmNvb2tpZXNFbmFibGVkICAgID0gdHJ1ZTtcbnBoYW50b20uamF2YXNjcmlwdEVuYWJsZWQgPSB0cnVlO1xuXG5jb25zdCBmYWNhZGUgPSBhc3luYyh7dXNlcm5hbWUsIHBhc3N3b3JkLCB0YWd9KSA9PiB7XG4gIGxldCBqc29uICA9IGZhbHNlXG4gIGxldCBlcnJvciA9IGZhbHNlXG5cbiAgLy8gY3JlYXRlIHBoYW50b21qcyBpbnN0YW5jZVxuICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHBoYW50b20uY3JlYXRlKClcblxuICB0cnkge1xuICAgIC8vIGNyZWF0ZSBwYWdlXG4gICAgbGV0IHBhZ2UgPSBhd2FpdCBpbnN0YW5jZS5jcmVhdGVQYWdlKClcbiAgICBwYWdlLnNldHRpbmcoJ3VzZXJBZ2VudCcsICdNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXT1c2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzQ0LjAuMjQwMy4xNTcgU2FmYXJpLzUzNy4zNicpXG4gICAgcGFnZS5zZXR0aW5nKCdqYXZhc2NyaXB0RW5hYmxlZCcsIHRydWUpXG4gICAgcGFnZS5zZXR0aW5nKCdsb2FkSW1hZ2VzJywgZmFsc2UpXG5cbiAgICAvLyBvcGVuIGxvZ2luIHBhZ2VcbiAgICBsb2dnZXIoJ09wZW4gbG9naW4gcGFnZS4uLicpXG4gICAgY29uc3Qgc3RhdHVzT3BlbkxvZ2luUGFnZSA9IGF3YWl0IGV2YWx1YXRlLm9wZW5Mb2dpbkZvcm0ocGFnZSlcbiAgICBpZiAoc3RhdHVzT3BlbkxvZ2luUGFnZSAhPT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNlYXJjaCBmb3IgbG9naW4gcGFnZSByZXN1bHQgaW4gc3RhdHVzOiAke3N0YXR1c09wZW5Mb2dpblBhZ2V9YClcbiAgICB9XG4gICAgbG9nZ2VyKCdTdWNjZXNzZnVsbCBvcGVuIGxvZ2luIHBhZ2UhJylcblxuICAgIC8vIGNoZWNrIGlmIGxvZ2luIGZvcm0gZXhpc3RzXG4gICAgbG9nZ2VyKCdWYWxpZGF0ZSBpbnB1dGZpZWxkcyBsb2dpbiBmb3JtLi4uJylcbiAgICBjb25zdCBmb3JtRXhpc3RzID0gYXdhaXQgZXZhbHVhdGUuaGFzTG9naW5Gb3JtKHBhZ2UpXG4gICAgaWYgKCFmb3JtRXhpc3RzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbiBub3QgZmluZCBhIGxvZ2luIGZvcm0gaW4gbG9naW4gcGFnZWApXG4gICAgfVxuICAgIGxvZ2dlcignU3VjY2Vzc2Z1bGwgZm91bmQgbG9naW4gZm9ybSEnKVxuXG4gICAgLy8gRmlsbCBpbiBjcmVkZW50aWFscyBhbmQgc3VibWl0IGxvZ2luIGZvcm1cbiAgICBsb2dnZXIoJ0ZpbGwgaW4gY3JlZGVudGlhbHMgYW5kIHN1Ym1pdCBsb2dpbiBmb3JtLi4uJylcbiAgICBhd2FpdCBldmFsdWF0ZS5zdWJtaXRMb2dpbkZvcm0ocGFnZSwgdXNlcm5hbWUsIHBhc3N3b3JkKVxuXG4gICAgLy8gVmFsaWRhdGUgbmV4dCBwYWdlIGFmdGVyIGxvZ2luXG4gICAgbG9nZ2VyKCdXYWl0IHVudGlsIHBhZ2UgaXMgc3VibWl0dGVkIGFuZCBjaGVjayBpZiBwYWdlIGlzIG5vdCB0aGUgbG9naW4gcGFnZS4uLicpXG4gICAgY29uc3QgcGFnZUFmdGVyTG9naW4gPSBhd2FpdCBldmFsdWF0ZS5nZXRQYWdlQWZ0ZXJTdWJtaXQocGFnZSlcbiAgICBpZiAocGFnZUFmdGVyTG9naW4gPT09ICdMb2dpbkFuZFNpZ251cFBhZ2UnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbiBub3QgbG9naW4gb24gSW5zdGFncmFtIHdpdGggZ2l2ZW4gY3JlZGVudGlhbHNgKVxuICAgIH1cbiAgICBsb2dnZXIoJ1N1Y2Nlc3NmdWxsIGxvZ2dlZCBpbiEnKVxuXG4gICAgLy8gY3JlYXRlIG5ldyBwYWdlXG4gICAgcGFnZSA9IGF3YWl0IGluc3RhbmNlLmNyZWF0ZVBhZ2UoKVxuXG4gICAgLy8gT3BlbiBleHBsb3JlIHRhZyBwYWdlXG4gICAgbG9nZ2VyKCdPcGVuIGV4cGxvcmUgdGFnIHBhZ2UuLi4nKVxuICAgIGNvbnN0IHN0YXR1c0V4cGxvcmVUYWdQYWdlID0gYXdhaXQgZXZhbHVhdGUub3BlblRhZ1BhZ2UocGFnZSwgdGFnKVxuICAgIGlmIChzdGF0dXNFeHBsb3JlVGFnUGFnZSAhPT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbiBub3Qgb3BlbiBleHBsb3JlIHRhZ3MgcGFnZWApXG4gICAgfVxuICAgIGxvZ2dlcignU3VjY2Vzc2Z1bGwgb3BlbmVkIGV4cGxvcmUgdGFncyBwYWdlIScpXG5cbiAgICAvLyBHZXQganNvbiBvZiBleHBsb3JlIHRhZ3NcbiAgICBsb2dnZXIoJ0dldCBqc29uIG9iamVjdCBmcm9tIGV4cGxvcmUgdGFncyBwYWdlLi4uJylcbiAgICBqc29uID0gYXdhaXQgZXZhbHVhdGUuZ2V0SnNvbihwYWdlKVxuICAgIGlmICh0eXBlb2YganNvbiAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCBmZXRjaCBqc29uIG9iamVjdCBmcm9tIGV4cGxvcmUgdGFncyBwYWdlYClcbiAgICB9XG4gICAgbG9nZ2VyKCdTdWNjZXNzZnVsbCBmZXRjaGVkIGRhdGEgJWonLCBqc29uKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBlcnJvciA9IGVyclxuICB9XG5cbiAgLy8gZm9yY2UgZXhpdCBwaGFudG9tIGluc3RhbmNlXG4gIGF3YWl0IGluc3RhbmNlLmV4aXQoKTtcblxuICAvLyB0aHJvd3MgZXJyb3IgaWYgZXhpc3RzXG4gIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgdGhyb3cgZXJyb3JcbiAgfVxuXG4gIHJldHVybiBqc29uXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmFjYWRlXG4iXX0=
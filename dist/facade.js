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
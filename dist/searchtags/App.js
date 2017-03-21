'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phantom = require('phantom');

var _phantom2 = _interopRequireDefault(_phantom);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _createPage = require('./createPage');

var _createPage2 = _interopRequireDefault(_createPage);

var _evaluate = require('../evaluate');

var _evaluate2 = _interopRequireDefault(_evaluate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// default phantom settings
_phantom2.default.cookiesEnabled = true;
_phantom2.default.javascriptEnabled = true;

// logger when environment is called with DEBUG=instagramsearchtags
const logger = (0, _debug2.default)('instagramsearchtags');

class App {

  /**
   * App constructor
   *
   * @constructor
   * @param {String} username
   * @param {String} password
   */
  constructor({ username, password }) {
    this._phantomInstance = null;
    this._isLoggedIn = false;

    Object.assign(this, { username, password });
  }

  /**
   * Login
   */
  login() {
    var _this = this;

    return _asyncToGenerator(function* () {
      // close connection if found
      if (_this._phantomInstance) {
        yield _this._phantomInstance.exit();
      }

      // create new Phantom instance
      _this._phantomInstance = yield _phantom2.default.create();

      // create page
      const page = yield (0, _createPage2.default)(_this._phantomInstance);

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
      yield _evaluate2.default.submitLoginForm(page, _this.username, _this.password);

      // Validate next page after login
      logger('Wait until page is submitted and check if page is not the login page...');
      const pageAfterLogin = yield _evaluate2.default.getPageAfterSubmit(page);
      if (pageAfterLogin === 'LoginAndSignupPage') {
        throw new Error(`Can not login on Instagram with given credentials`);
      }
      logger('Successfull logged in!');

      // set new logged in state
      _this._isLoggedIn = true;
    })();
  }

  /**
   * Create tag
   *
   * @param   {String} tag
   * @return  {Tag}
   */
  createTag(tag) {
    if (!this._isLoggedIn) {
      throw new Error('Can only create tag if user is logged in.');
    }

    return new _Tag2.default(this._phantomInstance, tag);
  }

  /**
   * Close connection
   */
  close() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (_this2._phantomInstance) {
        yield _this2._phantomInstance.exit();
      }
    })();
  }
}
exports.default = App;
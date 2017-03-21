'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Create page from Phantom instance
 *
 * @param   {Phantom} instance
 * @return  {Promise.<Page>}
 */
exports.default = function () {
  var _ref = _asyncToGenerator(function* (instance) {
    const page = yield instance.createPage();
    page.setting('userAgent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36');
    page.setting('javascriptEnabled', true);
    page.setting('loadImages', false);

    return page;
  });

  function createPage(_x) {
    return _ref.apply(this, arguments);
  }

  return createPage;
}();
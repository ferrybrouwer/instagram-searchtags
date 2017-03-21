"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Evaluate with timeout
 *
 * @param  {Promise}  evaluate          The page evaluation of phantomjs
 * @param  {Function} matchEvaluation   Higher order function to match value
 * @param  {Number}   timeout           The amount of timeout
 * @return {mixed}
 */
let evaluateWithTimeout = exports.evaluateWithTimeout = function () {
  var _ref = _asyncToGenerator(function* (evaluate, matchEvaluation, timeout = 5000) {
    let hasTimeout = false;
    const t = setTimeout(function () {
      return hasTimeout = true;
    }, timeout);

    let value = yield evaluate();
    while (!matchEvaluation(value) && !hasTimeout) {
      value = yield evaluate();
    }
    clearTimeout(t);

    return value;
  });

  return function evaluateWithTimeout(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
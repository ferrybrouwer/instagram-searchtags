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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImV2YWx1YXRlIiwibWF0Y2hFdmFsdWF0aW9uIiwidGltZW91dCIsImhhc1RpbWVvdXQiLCJ0Iiwic2V0VGltZW91dCIsInZhbHVlIiwiY2xlYXJUaW1lb3V0IiwiZXZhbHVhdGVXaXRoVGltZW91dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7OzsrQkFRTyxXQUFtQ0EsUUFBbkMsRUFBNkNDLGVBQTdDLEVBQThEQyxVQUFVLElBQXhFLEVBQThFO0FBQ25GLFFBQUlDLGFBQWEsS0FBakI7QUFDQSxVQUFNQyxJQUFXQyxXQUFXO0FBQUEsYUFBT0YsYUFBYSxJQUFwQjtBQUFBLEtBQVgsRUFBc0NELE9BQXRDLENBQWpCOztBQUVBLFFBQUlJLFFBQVEsTUFBTU4sVUFBbEI7QUFDQSxXQUFPLENBQUNDLGdCQUFnQkssS0FBaEIsQ0FBRCxJQUEyQixDQUFDSCxVQUFuQyxFQUErQztBQUM3Q0csY0FBUSxNQUFNTixVQUFkO0FBQ0Q7QUFDRE8saUJBQWFILENBQWI7O0FBRUEsV0FBT0UsS0FBUDtBQUNELEc7O2tCQVhxQkUsbUIiLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXZhbHVhdGUgd2l0aCB0aW1lb3V0XG4gKlxuICogQHBhcmFtICB7UHJvbWlzZX0gIGV2YWx1YXRlICAgICAgICAgIFRoZSBwYWdlIGV2YWx1YXRpb24gb2YgcGhhbnRvbWpzXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gbWF0Y2hFdmFsdWF0aW9uICAgSGlnaGVyIG9yZGVyIGZ1bmN0aW9uIHRvIG1hdGNoIHZhbHVlXG4gKiBAcGFyYW0gIHtOdW1iZXJ9ICAgdGltZW91dCAgICAgICAgICAgVGhlIGFtb3VudCBvZiB0aW1lb3V0XG4gKiBAcmV0dXJuIHttaXhlZH1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV2YWx1YXRlV2l0aFRpbWVvdXQoZXZhbHVhdGUsIG1hdGNoRXZhbHVhdGlvbiwgdGltZW91dCA9IDUwMDApIHtcbiAgbGV0IGhhc1RpbWVvdXQgPSBmYWxzZVxuICBjb25zdCB0ICAgICAgICA9IHNldFRpbWVvdXQoKCkgPT4gKGhhc1RpbWVvdXQgPSB0cnVlKSwgdGltZW91dClcblxuICBsZXQgdmFsdWUgPSBhd2FpdCBldmFsdWF0ZSgpXG4gIHdoaWxlICghbWF0Y2hFdmFsdWF0aW9uKHZhbHVlKSAmJiAhaGFzVGltZW91dCkge1xuICAgIHZhbHVlID0gYXdhaXQgZXZhbHVhdGUoKVxuICB9XG4gIGNsZWFyVGltZW91dCh0KVxuXG4gIHJldHVybiB2YWx1ZVxufVxuIl19
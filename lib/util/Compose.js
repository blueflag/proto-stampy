"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Compose;

// Code from redux: https://github.com/reactjs/redux/blob/master/LICENSE.md

/**
 * @module Utils
 */

/**
 * `Compose` accepts a number of functions as arguments, and nests them inside each other.
 * From right to left, each function is passed into the next.
 *
 * @example
 * const withHocks = Compose(
 *     withState,
 *     splitToKeys,
 *     splitToPipes
 * );
 *
 * export default withHocks(Example);
 *
 * @param {Function} ....props The set of functions to compose.
 * @return {Function} The composed function.
 */

function Compose() {
    for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
        funcs[_key] = arguments[_key];
    }

    if (funcs.length === 0) {
        return function (arg) {
            return arg;
        };
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce(function (a, b) {
        return function () {
            return a(b.apply(undefined, arguments));
        };
    });
}
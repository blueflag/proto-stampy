'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _Compose = require('../Compose');

var _Compose2 = _interopRequireDefault(_Compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Code from redux: https://github.com/reactjs/redux/blob/master/LICENSE.md

(0, _ava2.default)('Compose composes from right to left', function (tt) {
    var double = function double(x) {
        return x * 2;
    };
    var square = function square(x) {
        return x * x;
    };
    tt.is((0, _Compose2.default)(square)(5), 25);
    tt.is((0, _Compose2.default)(square, double)(5), 100);
    tt.is((0, _Compose2.default)(double, square, double)(5), 200);
});

(0, _ava2.default)('Compose composes functions from right to left', function (tt) {
    var a = function a(next) {
        return function (x) {
            return next(x + 'a');
        };
    };
    var b = function b(next) {
        return function (x) {
            return next(x + 'b');
        };
    };
    var c = function c(next) {
        return function (x) {
            return next(x + 'c');
        };
    };
    var final = function final(x) {
        return x;
    };

    tt.is((0, _Compose2.default)(a, b, c)(final)(''), 'abc');
    tt.is((0, _Compose2.default)(b, c, a)(final)(''), 'bca');
    tt.is((0, _Compose2.default)(c, a, b)(final)(''), 'cab');
});

(0, _ava2.default)('Compose throws at runtime if argument is not a function', function (tt) {
    var square = function square(x) {
        return x * x;
    };
    var add = function add(x, y) {
        return x + y;
    };

    tt.throws(function () {
        return (0, _Compose2.default)(square, add, false)(1, 2);
    });
    tt.throws(function () {
        return (0, _Compose2.default)(square, add, undefined)(1, 2);
    });
    tt.throws(function () {
        return (0, _Compose2.default)(square, add, true)(1, 2);
    });
    tt.throws(function () {
        return (0, _Compose2.default)(square, add, NaN)(1, 2);
    });
    tt.throws(function () {
        return (0, _Compose2.default)(square, add, '42')(1, 2);
    });
});

(0, _ava2.default)('Compose can be seeded with multiple arguments', function (tt) {
    var square = function square(x) {
        return x * x;
    };
    var add = function add(x, y) {
        return x + y;
    };
    tt.is((0, _Compose2.default)(square, add)(1, 2), 9);
});

(0, _ava2.default)('Compose returns the first given argument if given no functions', function (tt) {
    tt.is((0, _Compose2.default)()(1, 2), 1);
    tt.is((0, _Compose2.default)()(3), 3);
    tt.is((0, _Compose2.default)()(), undefined);
});

(0, _ava2.default)('Compose returns the first function if given only one', function (tt) {
    var fn = function fn() {};

    tt.is((0, _Compose2.default)(fn), fn);
});
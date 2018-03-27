'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _Hock = require('../Hock');

var _Hock2 = _interopRequireDefault(_Hock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('Hock should return a function that returns the contents of its param.hock function', function (tt) {
    tt.is((0, _Hock2.default)({
        hock: function hock() {
            return 123;
        }
    })(), 123);
});

(0, _ava2.default)('Hock should pass the config argument through to the hockCreator function', function (tt) {
    var myHock = (0, _Hock2.default)({
        hock: function hock(config) {
            tt.deepEqual(config, { cool: true }, 'config should pass through to hockCreator function');
        }
    });

    myHock({ cool: true });
});

(0, _ava2.default)('Hock should default config to an empty object', function (tt) {
    (0, _Hock2.default)({
        hock: function hock(config) {
            tt.deepEqual(config, {}, 'config should be an empty object');
        }
    })();
});

(0, _ava2.default)('Hock should default config to a function that returns an empty object if passed null', function (tt) {
    (0, _Hock2.default)({
        hock: function hock(config) {
            tt.deepEqual(config, {}, 'config should be an empty object');
        }
    })(null);
});

(0, _ava2.default)('Hock should apply defaults to individual config keys', function (tt) {
    var myHock = (0, _Hock2.default)({
        hock: function hock(config) {
            tt.deepEqual(config, { cool: true, nice: false, choice: true });
        },
        defaultConfig: {
            nice: false,
            choice: false
        }
    });

    // hock usage overriding defaults
    myHock({
        cool: true,
        choice: true
    });
});

(0, _ava2.default)('Hock should error if params.hock is not provided', function (tt) {
    tt.truthy(tt.throws(function () {
        (0, _Hock2.default)({});
    }));
});

(0, _ava2.default)('Hock should error if config is truthy and not an object, while shorthandKey is not set', function (tt) {
    var myHock = (0, _Hock2.default)({
        hock: function hock() {}
    });

    tt.truthy(tt.throws(function () {
        myHock(123);
    }));

    tt.truthy(tt.throws(function () {
        myHock("???");
    }));

    tt.truthy(tt.throws(function () {
        myHock(function () {
            return {};
        });
    }));
});

(0, _ava2.default)('Hock should error if config is truthy and not an object or function, while shorthandKey is set', function (tt) {
    var myHock = (0, _Hock2.default)({
        hock: function hock() {},
        shorthandKey: "abc"
    });

    tt.truthy(tt.throws(function () {
        myHock(123);
    }));

    tt.truthy(tt.throws(function () {
        myHock("???");
    }));
});

(0, _ava2.default)('Hock should use shorthandKey if set, and config is passed a function', function (tt) {
    tt.plan(1);

    var myHock = (0, _Hock2.default)({
        hock: function hock(config) {
            config.foo();
        },
        shorthandKey: "foo"
    });

    myHock(function () {
        tt.pass();
    });
});
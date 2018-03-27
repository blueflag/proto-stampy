'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _SpruceClassName = require('../SpruceClassName');

var _SpruceClassName2 = _interopRequireDefault(_SpruceClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('modifier splitting', function (tt) {
    var className = (0, _SpruceClassName2.default)({ name: 'Test', modifier: 'rad cool' });

    tt.truthy(className.match(/\bTest\b/) && className.match(/\bTest-rad\b/) && className.match(/\bTest-cool\b/));
});

(0, _ava2.default)('peer splitting', function (tt) {
    var className = (0, _SpruceClassName2.default)({ name: 'Test', peer: 'rad cool' });

    tt.truthy(className.match(/\bTest\b/) && className.match(/\bTest--rad\b/) && className.match(/\bTest--cool\b/));
});

(0, _ava2.default)('extra classnames params', function (tt) {
    var className = (0, _SpruceClassName2.default)({ name: 'Test' }, 'extra');
    tt.truthy(className.match(/\bTest\b/) && className.match(/\bextra\b/));
});

(0, _ava2.default)('modifier splitting with objects', function (tt) {
    var className = (0, _SpruceClassName2.default)({
        name: 'Test',
        modifier: {
            yes: true,
            no: false
        }
    });

    tt.truthy(className.match(/\bTest\b/) && className.match(/\bTest-yes\b/) && !className.match(/\bTest-no\b/));
});
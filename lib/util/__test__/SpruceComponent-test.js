'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _SpruceComponent = require('../SpruceComponent');

var _SpruceComponent2 = _interopRequireDefault(_SpruceComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Foo = (0, _SpruceComponent2.default)('Foo', 'li');
var fooWrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    Foo,
    { modifier: 'red', peer: 'Button' },
    'Rad'
));

(0, _ava2.default)('the component renders the given type', function (tt) {
    tt.is(fooWrapper.type(), 'li');

    var Bar = (0, _SpruceComponent2.default)('Bar', 'div');
    var barWrapper = (0, _enzyme.shallow)(_react2.default.createElement(
        Bar,
        { modifier: 'red', element: 'span' },
        'Rad'
    ));
    tt.is(barWrapper.type(), 'span');
});

(0, _ava2.default)('the component renders SpruceClassNames', function (tt) {
    tt.is(fooWrapper.hasClass('Foo'), true);
    tt.is(fooWrapper.hasClass('Foo-red'), true);
    tt.is(fooWrapper.hasClass('Foo--Button'), true);
});

var Bar = function Bar(_ref) {
    var className = _ref.className,
        children = _ref.children;
    return _react2.default.createElement('div', { className: className, children: children });
};
var Baz = (0, _SpruceComponent2.default)('Baz', Bar);
var bazWrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    Baz,
    { modifier: 'green' },
    'Rad'
));

(0, _ava2.default)('It renders custom components', function (tt) {
    tt.is(bazWrapper.hasClass('Baz'), true);
});
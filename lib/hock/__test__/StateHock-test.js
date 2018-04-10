'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StateHock = require('../StateHock');

var _StateHock2 = _interopRequireDefault(_StateHock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('StateHock should use initialState', function (tt) {
    tt.plan(2);

    var Child = function Child(props) {
        tt.is(props.value, 0, "StateHock should pass down state as value prop");
        return _react2.default.createElement('div', null);
    };

    var Component = (0, _StateHock2.default)({
        initialState: function initialState(props) {
            tt.is(props.aProp, "yes", 'StateHock.initialState should receive props');
            return 0;
        }
    })(Child);

    (0, _enzyme.shallow)(_react2.default.createElement(Component, { aProp: "yes" })).dive();
});

(0, _ava2.default)('StateHock should allow shorthand initialState', function (tt) {
    var Child = function Child(props) {
        tt.is(props.value, 0, "StateHock should pass down state as value prop");
        return _react2.default.createElement('div', null);
    };

    var Component = (0, _StateHock2.default)(function () {
        return 0;
    })(Child);

    (0, _enzyme.shallow)(_react2.default.createElement(Component, null)).dive();
});

(0, _ava2.default)('StateHock props.onChange should replace value', function (tt) {
    var Child = function Child() {
        return _react2.default.createElement('div', null);
    };
    var Component = (0, _StateHock2.default)(function () {
        return 0;
    })(Child);
    var instance = (0, _enzyme.shallow)(_react2.default.createElement(Component, null));
    instance.props().onChange(1);
    tt.is(instance.props().value, 1);
});

(0, _ava2.default)('StateHock should call config.onPropChange if provided', function (tt) {
    var Child = function Child() {
        return _react2.default.createElement('div', null);
    };
    var Component = (0, _StateHock2.default)({
        initialState: function initialState() {
            return 0;
        },
        onPropChange: function onPropChange(onChange, nextProps) {
            tt.is(nextProps, 'foo');
            onChange(nextProps);
        }
    })(Child);
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(Component, null));
    wrapper.instance().componentWillReceiveProps('foo');
    tt.is(wrapper.instance().state.value, 'foo');
});

(0, _ava2.default)('StateHock config.onPropChange should not be called if not provided', function (tt) {
    var Child = function Child() {
        return _react2.default.createElement('div', null);
    };
    var Component = (0, _StateHock2.default)(function () {
        return 0;
    })(Child);
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(Component, null));
    wrapper.instance().componentWillReceiveProps('foo');
    tt.is(wrapper.instance().state.value, 0);
});

(0, _ava2.default)('StateHock should be transparent, passes other props through', function (tt) {
    var Child = function Child() {
        return _react2.default.createElement('div', null);
    };
    var Component = (0, _StateHock2.default)()(Child);
    tt.is((0, _enzyme.shallow)(_react2.default.createElement(Component, { foo: 'bar' })).props().foo, 'bar');
    tt.is((0, _enzyme.shallow)(_react2.default.createElement(Component, { value: 'bar' })).props().value, undefined);
});
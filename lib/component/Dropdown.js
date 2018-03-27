'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DropdownStateful = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Compose = require('stampy/lib/util/Compose');

var _Compose2 = _interopRequireDefault(_Compose);

var _SpruceClassName = require('stampy/lib/util/SpruceClassName');

var _SpruceClassName2 = _interopRequireDefault(_SpruceClassName);

var _StateHock = require('stampy/lib/hock/StateHock');

var _StateHock2 = _interopRequireDefault(_StateHock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module Components
 */

/**
 * @component
 *
 * `DropDown` is a controlled component that displays a dropdown list of options based off a schema object.
 * It does not keep state but provides an onChange function that toggles `props.isOpen`.
 *
 * @example
 */

var Dropdown = function (_React$Component) {
    (0, _inherits3.default)(Dropdown, _React$Component);

    function Dropdown() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Dropdown);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Dropdown.__proto__ || (0, _getPrototypeOf2.default)(Dropdown)).call.apply(_ref, [this].concat(args))), _this), _this.closeDropdown = function (ee) {
            if (_this.props.isOpen && _this.element instanceof window.HTMLElement && !_this.element.contains(ee.target)) {
                _this.props.onChange(false);
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Dropdown, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (typeof window !== 'undefined') {
                window.addEventListener("click", this.closeDropdown, false);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener("click", this.closeDropdown, false);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                Button = _props.button,
                className = _props.className,
                modifier = _props.modifier,
                onChange = _props.onChange,
                peer = _props.peer,
                isOpen = _props.isOpen,
                name = _props.spruceName,
                schema = _props.schema;


            var divClassName = (0, _SpruceClassName2.default)({ name: name, modifier: modifier, className: className, peer: peer });
            var buttonClassName = (0, _SpruceClassName2.default)({ name: name + '_button', modifier: modifier });
            var listClassName = (0, _SpruceClassName2.default)({ name: name + '_list', modifier: modifier });
            var listItemClassName = (0, _SpruceClassName2.default)({ name: name + '_listItem', modifier: modifier });

            return _react2.default.createElement(
                'div',
                { className: divClassName, ref: function ref(elem) {
                        return _this2.element = elem;
                    } },
                _react2.default.createElement(
                    'div',
                    { className: buttonClassName, onClick: function onClick() {
                            return onChange(!isOpen);
                        } },
                    _react2.default.createElement(Button, { isOpen: isOpen })
                ),
                isOpen && _react2.default.createElement(
                    'ul',
                    { className: listClassName },
                    schema.map(function (schemaItem, key) {
                        var Render = schemaItem.render,
                            onClick = schemaItem.onClick,
                            active = schemaItem.active;


                        var itemClick = function itemClick() {
                            onClick && onClick();
                            onChange(false);
                        };

                        return _react2.default.createElement(
                            'li',
                            {
                                key: key,
                                className: listItemClassName,
                                onClick: itemClick
                            },
                            _react2.default.createElement(Render, null)
                        );
                    })
                )
            );
        }
    }]);
    return Dropdown;
}(_react2.default.Component);

/**
 * @component
 *
 * `DropdownStateful` is a stateful version of Dropdown.
 *
 * @example
 */

Dropdown.defaultProps = {
    onChange: function onChange(data) {
        return data;
    },
    isOpen: false,
    spruceName: 'Dropdown'
};
exports.default = Dropdown;
var DropdownStateful = exports.DropdownStateful = (0, _Compose2.default)((0, _StateHock2.default)(function () {
    return {
        isOpen: false
    };
}), function (Component) {
    return function (props) {
        return _react2.default.createElement(Component, (0, _extends3.default)({}, props, {
            isOpen: props.value.isOpen,
            onChange: function onChange(isOpen) {
                return props.onChange({ isOpen: isOpen });
            }
        }));
    };
})(Dropdown);
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _Hock = require('stampy/lib/util/Hock');

var _Hock2 = _interopRequireDefault(_Hock);

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _Hock2.default)({
    hock: function hock(config) {
        return function (ComponentToDecorate) {
            return function (_React$Component) {
                (0, _inherits3.default)(IslandHock, _React$Component);

                function IslandHock(props) {
                    (0, _classCallCheck3.default)(this, IslandHock);

                    var _this = (0, _possibleConstructorReturn3.default)(this, (IslandHock.__proto__ || (0, _getPrototypeOf2.default)(IslandHock)).call(this, props));

                    _this.onSave = function (value) {
                        _this.props.onChange(value);
                    };

                    _this.onChange = function (value) {
                        var meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                        // return early if a save was forced.
                        if (meta.islandChange) {
                            _this.onSave(value);
                            return;
                        }

                        // debounced islands need to
                        // both save and set their state
                        // so they dont return early
                        if (config.debounce) {
                            _this.onSave(value);
                        }

                        _this.setState({ value: value });
                    };

                    if (config.debounce) {
                        _this.onSave = (0, _debounce2.default)(_this.onSave, config.debounce);
                    }

                    _this.state = {
                        value: props.value
                    };
                    return _this;
                }

                (0, _createClass3.default)(IslandHock, [{
                    key: 'componentWillReceiveProps',
                    value: function componentWillReceiveProps(nextProps) {
                        var value = nextProps.value;

                        if (this.state.value !== value) {
                            this.setState({ value: value });
                        }
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        return _react2.default.createElement(ComponentToDecorate, (0, _extends3.default)({}, this.props, {
                            onChange: this.onChange,
                            value: this.state.value
                        }));
                    }
                }]);
                return IslandHock;
            }(_react2.default.Component);
        };
    },
    defaultConfig: {
        debounce: null
    }
});
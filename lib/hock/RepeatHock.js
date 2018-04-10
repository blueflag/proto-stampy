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

var _Hock = require('../util/Hock');

var _Hock2 = _interopRequireDefault(_Hock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _Hock2.default)({
    hock: function hock(config) {
        return function (ComponentToDecorate) {
            return function (_React$Component) {
                (0, _inherits3.default)(RepeatHock, _React$Component);

                function RepeatHock(props) {
                    (0, _classCallCheck3.default)(this, RepeatHock);

                    var _this = (0, _possibleConstructorReturn3.default)(this, (RepeatHock.__proto__ || (0, _getPrototypeOf2.default)(RepeatHock)).call(this, props));

                    _this.tick = function () {
                        var _this$state = _this.state,
                            firstRepeat = _this$state.firstRepeat,
                            isRepeating = _this$state.isRepeating,
                            lastRepeat = _this$state.lastRepeat;


                        _this.request = requestAnimationFrame(_this.tick);

                        if (!isRepeating) {
                            return;
                        }

                        var now = new Date();
                        var timeoutValue = config.timeout(_this.props);
                        if (timeoutValue && firstRepeat && now - firstRepeat > timeoutValue) {
                            _this.setState({
                                isRepeating: false,
                                timedOut: true
                            });
                        } else if (lastRepeat && now - lastRepeat > config.interval(_this.props)) {
                            _this.doRepeat();
                        }
                    };

                    _this.doRepeat = function () {
                        _this.setState({
                            isRepeating: true,
                            lastRepeat: new Date(),
                            repeats: _this.state.repeats + 1
                        });
                    };

                    _this.startRepeats = function () {
                        _this.setState({
                            firstRepeat: new Date()
                        });
                        _this.doRepeat();
                    };

                    _this.stopRepeats = function () {
                        if (!_this.state.isRepeating) {
                            return;
                        }
                        _this.setState({
                            isRepeating: false
                        });
                    };

                    _this.state = {
                        isRepeating: config.initialRepeat,
                        firstRepeat: null,
                        lastRepeat: null,
                        repeats: 0,
                        timedOut: false
                    };
                    return _this;
                }

                (0, _createClass3.default)(RepeatHock, [{
                    key: 'componentDidMount',
                    value: function componentDidMount() {
                        this.request = requestAnimationFrame(this.tick);
                        if (this.state.isRepeating) {
                            this.startRepeats();
                        }
                    }
                }, {
                    key: 'componentWillUnmount',
                    value: function componentWillUnmount() {
                        cancelAnimationFrame(this.request);
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        return _react2.default.createElement(ComponentToDecorate, (0, _extends3.default)({}, this.props, this.state, {
                            startRepeats: this.startRepeats,
                            stopRepeats: this.stopRepeats
                        }));
                    }
                }]);
                return RepeatHock;
            }(_react2.default.Component);
        };
    },
    defaultConfig: {
        initialRepeat: true,
        interval: function interval() {
            return (/* props: Object */1000
            );
        },
        timeout: function timeout() {
            return (/* props: Object */null
            );
        }
    },
    shorthandKey: "interval"
});
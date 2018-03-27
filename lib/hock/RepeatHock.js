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
            var timeout = config.timeout,
                interval = config.interval,
                initialRepeat = config.initialRepeat;


            return function (_React$Component) {
                (0, _inherits3.default)(RepeatHock, _React$Component);

                function RepeatHock(props) {
                    (0, _classCallCheck3.default)(this, RepeatHock);

                    var _this = (0, _possibleConstructorReturn3.default)(this, (RepeatHock.__proto__ || (0, _getPrototypeOf2.default)(RepeatHock)).call(this, props));

                    _this.state = {
                        isRepeating: initialRepeat,
                        firstRepeat: null,
                        lastRepeat: null,
                        repeats: 0,
                        timedOut: false
                    };
                    _this.tick = _this.tick.bind(_this);
                    _this.startRepeats = _this.startRepeats.bind(_this);
                    _this.stopRepeats = _this.stopRepeats.bind(_this);
                    return _this;
                }

                (0, _createClass3.default)(RepeatHock, [{
                    key: 'tick',
                    value: function tick() {
                        this.request = requestAnimationFrame(this.tick);

                        if (!this.state.isRepeating) {
                            return;
                        }

                        var now = new Date();
                        if (timeout && now - this.state.firstRepeat > timeout(this.props)) {
                            this.setState({
                                isRepeating: false,
                                timedOut: true
                            });
                        } else if (now - this.state.lastRepeat > interval(this.props)) {
                            this.doRepeat();
                        }
                    }
                }, {
                    key: 'doRepeat',
                    value: function doRepeat() {
                        this.setState({
                            isRepeating: true,
                            lastRepeat: new Date(),
                            repeats: this.state.repeats + 1
                        });
                    }
                }, {
                    key: 'startRepeats',
                    value: function startRepeats() {
                        this.setState({
                            firstRepeat: new Date()
                        });
                        this.doRepeat();
                    }
                }, {
                    key: 'stopRepeats',
                    value: function stopRepeats() {
                        if (!this.state.isRepeating) {
                            return;
                        }
                        this.setState({
                            isRepeating: false
                        });
                    }
                }, {
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
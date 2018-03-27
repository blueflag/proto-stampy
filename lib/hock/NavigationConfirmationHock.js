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

var MissingHistoryError = function MissingHistoryError() {
    return new Error('React Route 4 history object must be provided to NavigationConfirmationHock');
};

exports.default = (0, _Hock2.default)({
    hock: function hock(_ref) {
        var confirmWhen = _ref.confirmWhen;
        return function (ComponentToDecorate) {
            return function (_React$Component) {
                (0, _inherits3.default)(NavigationConfirmationHock, _React$Component);

                function NavigationConfirmationHock(props) {
                    (0, _classCallCheck3.default)(this, NavigationConfirmationHock);

                    var _this = (0, _possibleConstructorReturn3.default)(this, (NavigationConfirmationHock.__proto__ || (0, _getPrototypeOf2.default)(NavigationConfirmationHock)).call(this, props));

                    _this.resetState = function () {
                        _this.setState({
                            blocked: false,
                            nextLocation: null,
                            action: null
                        });
                    };

                    _this.cancelNavigation = function () {
                        _this.resetState();
                    };

                    _this.continueNavigation = function () {
                        _this.unblockRouteChange();

                        var history = _this.props.history;
                        var _this$state = _this.state,
                            action = _this$state.action,
                            nextLocation = _this$state.nextLocation;


                        _this.resetState();

                        var actionMap = {
                            PUSH: function PUSH() {
                                return history.push(nextLocation);
                            },
                            REPLACE: function REPLACE() {
                                return history.replace(nextLocation);
                            },
                            POP: function POP() {
                                return history.goBack();
                            }
                        };

                        actionMap[action] && actionMap[action]();
                    };

                    _this.protectRouteChange = function () {
                        var history = _this.props.history;

                        if (!history) {
                            throw MissingHistoryError();
                        }

                        _this.unprotectRouteChange();

                        // when react-router is about to change routes, this function will be called
                        // so we reject react-router's automatic route transition and instead
                        // provide an identical one as an actionProp

                        _this.unblockRouteChange = history.block(function (nextLocation, action) {

                            if (!confirmWhen(_this.props, nextLocation, action)) {
                                return true;
                            }

                            _this.setState({
                                blocked: true,
                                nextLocation: nextLocation,
                                action: action
                            });
                            return false;
                        });
                    };

                    _this.unprotectRouteChange = function () {
                        _this.unblockRouteChange && _this.unblockRouteChange();
                    };

                    _this.state = {
                        blocked: false,
                        nextLocation: null,
                        action: null
                    };
                    return _this;
                }

                (0, _createClass3.default)(NavigationConfirmationHock, [{
                    key: 'componentWillMount',
                    value: function componentWillMount() {
                        this.protectRouteChange();
                    }
                }, {
                    key: 'componmentWillUnmount',
                    value: function componmentWillUnmount() {
                        this.unprotectRouteChange();
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        return _react2.default.createElement(ComponentToDecorate, (0, _extends3.default)({}, this.props, {
                            cancelNavigation: this.cancelNavigation,
                            continueNavigation: this.continueNavigation,
                            navigationBlocked: this.state.blocked
                        }));
                    }
                }]);
                return NavigationConfirmationHock;
            }(_react2.default.Component);
        };
    },
    defaultConfig: {
        confirmWhen: function confirmWhen() {
            return (/* props: Object, nextLocation: Object, action: string */true
            );
        }
    },
    shorthandKey: "confirmWhen"
});
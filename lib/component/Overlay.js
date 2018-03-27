'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Overlay = function (_React$Component) {
    (0, _inherits3.default)(Overlay, _React$Component);

    function Overlay() {
        (0, _classCallCheck3.default)(this, Overlay);
        return (0, _possibleConstructorReturn3.default)(this, (Overlay.__proto__ || (0, _getPrototypeOf2.default)(Overlay)).apply(this, arguments));
    }

    (0, _createClass3.default)(Overlay, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                isOpen = _props.isOpen,
                onAfterOpen = _props.onAfterOpen,
                onRequestClose = _props.onRequestClose,
                render = _props.render,
                spruceName = _props.spruceName,
                title = _props.title;


            return _react2.default.createElement(
                _reactModal2.default,
                {
                    isOpen: isOpen,
                    onAfterOpen: onAfterOpen,
                    onRequestClose: onRequestClose,
                    className: spruceName + '_content',
                    overlayClassName: spruceName,
                    contentLabel: title
                },
                isOpen && render({
                    onRequestClose: onRequestClose,
                    title: title
                })
            );
        }
    }]);
    return Overlay;
}(_react2.default.Component);

Overlay.defaultProps = {
    onAfterOpen: function onAfterOpen() {},
    spruceName: 'Overlay',
    title: 'Message'
};
exports.default = Overlay;
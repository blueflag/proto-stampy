'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

/**
 * @module Hocks
 */

exports.default = (0, _Hock2.default)({
    hock: function hock(config) {
        return function (ComponentToDecorate) {

            /**
             * @component
             *
             * State hock allows you to control state changes through the prop cycle. It provides a prop of `value` and `onChange`.
             * Value is the current state and onChange is a callback whose return value will replace `value`.
             * Because the whole state is replaced each time, it works particularly well with immutable data.
             *
             * @example
             * // Counter
             * import {StateHock} from 'stampy';
             *
             * const example = (props) => {
             *     const {value, onChange} = props;
             *     return <div>
             *         <div>value: {value}</div>
             *         <button onClick={() => onChange(value + 1)}>+</button>
             *         <button onClick={() => onChange(value - 1)}>-</button>
             *     </div>
             * }
             *
             * const withState = StateHock((props) => ({initialState: 0}));
             * export default withState(example);
             *
             * // Immutable Data
             * import {StateHock} from 'stampy';
             * import {Map} from 'immutable';
             *
             * const example = (props) => {
             *     const {value, onChange} = props;
             *     return <div>
             *         <div>Foo: {value.get('foo')}</div>
             *         <button onClick={() => onChange(value.set('foo', 'bar'))}>Bar</button>
             *         <button onClick={() => onChange(value.set('foo', 'qux'))}>Qux</button>
             *     </div>
             * }
             *
             * const withState = StateHock((props) => Map());
             * export default withState(example);
             *
             * @childprop {any} value
             * The current stored value.
             * This prop's name can be changed in config.
             *
             * @childprop {function} onChange
             * Callback whose return value will replace `props.value`.
             * This prop's name can be changed in config.
             *
             * @decorator {StateHock}
             * @decorator {HockApplier}
             *
             * @memberof module:Hocks
             */

            return function (_React$Component) {
                (0, _inherits3.default)(StateHock, _React$Component);

                function StateHock(props) {
                    (0, _classCallCheck3.default)(this, StateHock);

                    var _this = (0, _possibleConstructorReturn3.default)(this, (StateHock.__proto__ || (0, _getPrototypeOf2.default)(StateHock)).call(this, props));

                    _this.onChange = function (payload) {
                        _this.setState({
                            value: payload
                        });
                    };

                    _this.state = {
                        value: config.initialState(props)
                    };
                    return _this;
                }

                (0, _createClass3.default)(StateHock, [{
                    key: 'componentWillReceiveProps',
                    value: function componentWillReceiveProps(nextProps) {
                        config.onPropChange(this.onChange, nextProps, this.state.value);
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        var _hockProps;

                        var valueProp = config.valueProp,
                            onChangeProp = config.onChangeProp;


                        var hockProps = (_hockProps = {}, (0, _defineProperty3.default)(_hockProps, valueProp(this.props), this.state.value), (0, _defineProperty3.default)(_hockProps, onChangeProp(this.props), this.onChange), _hockProps);

                        return _react2.default.createElement(ComponentToDecorate, (0, _extends3.default)({}, this.props, hockProps));
                    }
                }]);
                return StateHock;
            }(_react2.default.Component);
        };
    },
    defaultConfig: {
        initialState: function initialState() {
            return (/* props: Object */undefined
            );
        },
        valueProp: function valueProp() {
            return (/* props: Object */'value'
            );
        },
        onChangeProp: function onChangeProp() {
            return (/* props: Object */'onChange'
            );
        },
        onPropChange: function onPropChange() /* onChange: Function, nextProps: Object, value: Object */{}
    },
    shorthandKey: "initialState"
});

/**
 * @callback StateHock
 * @param {StateHockConfig} [config]
 */

/**
 * @callback onPropChange
 * @param {function} onChange - Callback to update state with
 * @param {object} nextProps - The new set of props
 * @param {*} state - The current version of state
 */

/**
 * @callback StateHockConfig
 * @param {Object} props
 * @return {StateHockConfigResult}
 * A function that accepts props and returns configuration for StateHock.
 */

/**
 * @typedef StateHockConfigResult
 * @type {Object}
 *
 * @property {*} [initialState]
 * The initial state for the hock.
 *
 * @property {onPropChange} [onPropChange]
 * Allows you to update the current value when props change.
 *
 * @property {string} [valueProp = "value"]
 * The name of the prop to pass the value down as.
 *
 * @property {string} [onChangeProp = "onChange"]
 * The name of the prop to pass the onChange down as.
 */
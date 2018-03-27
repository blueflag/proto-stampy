'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = SpruceComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SpruceClassName = require('./SpruceClassName');

var _SpruceClassName2 = _interopRequireDefault(_SpruceClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module Utils
 */

/**
 * `SpruceComponent` returns a React Element with SpruceClassNames applied to it.
 * It is used as a time saver when applying Spruce class names to dumb components.
 *
 * @param {String} name
 * Class name given to the new component
 *
 * @param {ReactElement|String} Element
 * Element to be given spruce classnames
 *
 * @return {ReactElement} 'Spruced' React element
 *
 * @example
 * const Table = SpruceComponent('Table', 'table');
 * const Grid = SpruceComponent('Grid', 'div');
 * const SpecialButton = SpruceComponent('SpecialButton', Button);
 *
 * function Component(props) {
 *      return <Grid>
 *          <Table>
 *              <tbody>
 *                  <tr><td>rad</td></tr>
 *              </tbody>
 *          </Table>
 *          <SpecialButton />
 *      </Grid>
 * }
 */

function SpruceComponent(name, defaultElement) {

    function spruceComponent(props) {
        var children = props.children,
            className = props.className,
            modifier = props.modifier,
            peer = props.peer,
            spruceName = props.spruceName,
            element = props.element,
            otherProps = (0, _objectWithoutProperties3.default)(props, ['children', 'className', 'modifier', 'peer', 'spruceName', 'element']);


        var Component = element || defaultElement;

        return _react2.default.createElement(Component, (0, _extends3.default)({
            className: (0, _SpruceClassName2.default)({ className: className, modifier: modifier, peer: peer, name: spruceName || name }),
            children: children
        }, otherProps));
    }

    spruceComponent.displayName = name;

    return spruceComponent;
}
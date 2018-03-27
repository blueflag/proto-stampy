'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SpruceClassName;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module Utils
 */

/**
 * `SpruceClassName` is a utility function to apply construct class names easily.
 * It uses the `classnames` package.
 * It accepts a components props and adheres to a standard usage of `modifier` and `className` props.
 *
 * @example
 * const props = {
 *     name: "Button",
 *     modifier: "large small",
 *     className: "AnotherClass"
 * };
 * return <div className={SpruceClassName(props, "ExtraClassName")} />
 * ^ // class name is "Button Button-large Button-small AnotherClass ExtraClassName"
 *
 * const props = {
 *     name: "Button",
 *     modifier: {
 *        yes: true,
 *        no false
 *     }
 * };
 * return <div className={SpruceClassName(props)} />
 * ^ // class name is "Button Button-yes"
 *
 * @param {Object} props An component's props.
 * @param {string} [props.name] The name of the components, which will be turned into a class name.
 * @param {SpruceModifier} [props.modifier]
 * @param {SprucePeer} [props.peer]
 * @param {ClassName} [props.className] Class name strings passed to the component with React's prop convention.
 * @param {...any} args More arguments to pass into `classnames`.
 * @return {string} Complete class names string.
 */

function SpruceClassName(props) {
    var name = props.name;


    var modifiers = (0, _classnames2.default)(props.modifier).split(' ').filter(function (ii) {
        return ii != '';
    })
    // $FlowFixMe: flow doesnt seem to know that vars passed into template strings are implicitly cast to strings
    .map(function (mm) {
        return name + '-' + mm;
    });

    var peers = (0, _classnames2.default)(props.peer).split(' ').filter(function (ii) {
        return ii != '';
    })
    // $FlowFixMe: flow doesnt seem to know that vars passed into template strings are implicitly cast to strings
    .map(function (pp) {
        return name + '--' + pp;
    });

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return (0, _classnames2.default)(props.name, modifiers, peers, args, props.className).replace(/\s+/g, ' ');
}
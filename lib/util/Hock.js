"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.default = Hock;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Hock(_ref) {
    var hock = _ref.hock,
        _ref$defaultConfig = _ref.defaultConfig,
        defaultConfig = _ref$defaultConfig === undefined ? {} : _ref$defaultConfig,
        shorthandKey = _ref.shorthandKey;

    if (!hock) {
        throw new Error("Hock must be passed an object with a key of \"hock\", containing a function that returns a hock applier");
    }

    return function (config) {

        if (!config) {
            config = {};
        }

        if (shorthandKey && typeof config === "function") {
            config = (0, _defineProperty3.default)({}, shorthandKey, config);
        }

        if ((typeof config === "undefined" ? "undefined" : (0, _typeof3.default)(config)) !== "object") {
            var or = shorthandKey ? ", or a \"" + shorthandKey + "\" function" : "";
            throw new Error("config must be an object" + or);
        }

        return hock((0, _extends3.default)({}, defaultConfig, config));
    };
}

/**
 * @module Utils
 */

/**
 * `Hock` creates hocks for you.
 *
 * @example
 * export default Hock(
 *     (config) => {
 *         return (ComponentToDecorate) => {
 *             class CoolHock extends Component {
 *                 render() {
 *                      return <ComponentToDecorate
 *                         {...this.props}
 *                         name={config.name}
 *                     />;
 *                 }
 *             }
 *             return CoolHock;
 *         }
 *     },
 *     () => ({
 *         name: "default name"
 *     })
 * );
 *
 * @name Hock
 * @kind function
 * @param {ConfiguredHockCreator} hockCreator
 * A function that must return a hock Component.
 *
 * @param {Function} [defaultConfig = () => {}]
 * The default config. Key / value pairs on the object returned from this function are used only when the key isn't returned from the hock config function.
 *
 * @param {Object} [defaultApplierConfig = {}]
 * The default applier config. Key / value pairs on this object are used only when the key isn't specified on the applierConfig object.
 *
 * @return {Function} The configured hock to export.
 */
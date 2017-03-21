'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

var Shorthand = require('./src/shorthand'),
    valdi = {
        version: function () { return require('./src/config').version; },
        string: require('./src/string-tool'),
        validator: require('./src/input-validator'),
        inspect: require('./src/inspector'),
        htmlEntities: require('./src/html-entities'),
        base64: require('./src/base64'),
        shorthand: Shorthand,
        sh: Shorthand,
        simple: Shorthand,
        expression: require('./src/validator-expression')
    };

exports.default = valdi;
module.exports = exports['default'];

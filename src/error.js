'use strict';

module.exports = function ValdiError(message, details) {
    this.message = message;
    this.details = (typeof details === 'undefined') ? null : details;
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.toString = function() {
        return JSON.stringify(this);
    };
};

require('util').inherits(module.exports, Error); //@todo: in ES6 use class and extends

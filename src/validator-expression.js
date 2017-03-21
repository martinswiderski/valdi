'use strict';
var Config = require('./config'),
    Inspector = require('./inspector'),
    shortid = require('shortid'),
    md5 = require('md5');

function ValidatorExpression() {


    this.err_codes = {
        invalidExpression: 'Expression must only be a string and value bool or ValidatorExpression',
        operatorMustBeString: 'Operator must be string',
        operatorDoesNotExist: 'Operator does not exist, must be AND|OR',
        operatorNotSet: 'Operator not set'

    };

    this._parent_id = '';
    this._id        = '';
    this._operators = {
        and: true,
        or: true
    };
    this.r = null;
    this.s = null;
    this.x = null;
    this.operator = '';
    this.errors = [];

    /**
     * key alias value true|false
     * @type object
     */
    this.assertions = {
    };

    this.add = function(alias, val) {
        if (Inspector.name(alias) !== 'string'
            || (val !== true && val !== false && Inspector.name(val) !== 'ValidatorExpression')) {
            this.errors.push(this.err_codes.invalidExpression);
        } else {
            if (Inspector.name(val) === 'ValidatorExpression') {
                val = val.evaluate().result();
            }
            this.assertions[alias] = val;
        }
        return this;
    };

    this.setOperator = function (operator) {
        if (Inspector.name(operator) !== 'string') {
            this.errors.push(this.err_codes.operatorMustBeString);
        } else {
            operator = operator.toLocaleLowerCase();
            if (!this._operators[operator]) {
                this.errors.push(this.err_codes.operatorDoesNotExist);
            } else {
                this.operator = operator;
            }
        }
        return this;
    };

    this.result = function() {
        if (null === this.r) {
            this.evaluate();
        }
        return this.r;
    };

    this.evaluate = function() {
        if (!this._operators[this.operator]) {
            this.errors.push(this.err_codes.operatorNotSet);
        } else {
            var alias, out = [];
            for (alias in this.assertions) out.push((this.assertions[alias] === true) ? '-' : '');
            this.s = out.join('');
            this.x = out.length;
            if (this.operator === 'or') {
                this.r = this.s.length > 0;
            } else {
                this.r = this.s.length === this.x;
            }
        }
        return this;
    };

    this.toObject = function(val) {
        return {
            value: val,
            error: !this.r,
            details: this.assertions
        };
    };

    this.init = function () {
        this._id = md5(shortid.generate());
        return this;
    };

    this.version = function() {
        return Config.version;
    };

    this.factory = function(config) {
        var obj = (new ValidatorExpression()).init();
        obj._parent_id = this._id;
        if (Inspector.name(config) === 'Object') {
            obj.wire(config);
        }
        return obj;
    };

    this.wire = function(config) {
        if (config._id) this._id = config._id;
        if (config.operator) this.setOperator(config.operator);
        if (Inspector.name(config.expressions) === 'Object') {
            for (var k in config.expressions) {
                this.add(k, config.expressions[k]);
            }
        }
    };
}

module.exports = (new ValidatorExpression()).init();

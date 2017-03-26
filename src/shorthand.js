'use strict';
var Config = require('./config'),
    instance = 0,
    InputValidator = require('./input-validator');

function Shorthand() {

    this._operator = 'and';
    this.id        = -1;
    this._value    = null;
    this.desc      = null;
    this.parent    = null;

    var _ops = {and: true, or: true},
        _parent  = '',
        _value   = '',
        _descr   = '',
        _tests   = {},
        _results = {};

    function _executeValidation(desc, id, parent, operator) {

        var i = 0, err = 0, tst = {};
        _results          = _resetResults(desc, id, parent);
        _results.value    = _value;

        for (var alias in _tests) {
            i++;
            tst = _tests[alias];
            if (tst.args.length === 0) {
                _results.tests[alias] = tst.assertion(_value);
            } else if (tst.args.length === 1) {
                _results.tests[alias] = tst.assertion(_value, tst.args[0]);
            } else if (tst.args.length === 2) {
                _results.tests[alias] = tst.assertion(_value, tst.args[0], tst.args[1]);
            }
            if (_results.tests[alias] === false) {
                err++;
            }
        }

        _results.all    = i;
        _results.errors = err;
        _results.status = (operator === 'and')
            ? (_results.all > 0 && _results.errors === 0) ? true : false
            : (_results.all > 0 && _results.errors !== _results.all) ? true : false;
    }

    function _resetResults(desc, own_id, parent_id) {
        return {
            identity: {
                desc: desc,
                id: own_id,
                parent: parent_id
            },
            status: null,
            value: null,
            all: 0,
            errors: 0,
            tests: {},
            _tests: null
        };
    }

    function _addtest(alias, test, args, desc) {
        _tests[alias] = {
            assertion: test,
            args: args,
            object: desc
        };
    }

    /**
     * Evaluates value against set criteria
     *
     * @param mixed input Input to validate
     *
     * @return boolean
     */
    this.value = function (input) {
        _value = input;
        this._value = input;
        _executeValidation(
            this.desc,
            this.id,
            this.parent,
            this._operator
        );

        //if (JSON.stringify(_results).indexOf(' trouble')>-1) {
        //    _results._tests = _tests;
        //    console.log(JSON.stringify(_results, null, 2));
        //}

        return _results.status;
    };


    this.operator = function(op) {
        if (typeof op === 'string' && _ops[op.toLocaleLowerCase()] === true) {
            this._operator = op.toLocaleLowerCase();
        }
        return this;
    };

    // validators

    this.number = function(ish) {
        if (typeof ish !== 'undefined') {
            _addtest('number', InputValidator.isNumber, [true]);
        } else {
            _addtest('number', InputValidator.isNumber, []);
        }
        return this;
    };

    this.integer = function(ish) {
        if (typeof ish !== 'undefined') {
            _addtest('integer', InputValidator.isInteger, [true]);
        } else {
            _addtest('integer', InputValidator.isInteger, []);
        }
        return this;
    };

    this.min = function(min) {
        _addtest('min', InputValidator.isMin, [min]);
        return this;
    };

    this.max = function(max) {
        _addtest('max', InputValidator.isMax, [max]);
        return this;
    };

    this.integerAsString = function() {
        _addtest('integerAsString', InputValidator.isIntegerAsString, []);
        return this;
    };

    this.real = function(ish) {
        if (typeof ish !== 'undefined') {
            _addtest('real', InputValidator.isReal, [true]);
        } else {
            _addtest('real', InputValidator.isReal, []);
        }
        return this;
    };

    this.realAsString = function() {
        _addtest('realAsString', InputValidator.isRealAsString, []);
        return this;
    };

    this.bool = function() {
        _addtest('bool', InputValidator.isBool, []);
        return this;
    };

    this.base64 = function() {
        _addtest('base64', InputValidator.isBase64, []);
        return this;
    };

    this.null = function() {
        _addtest('null', InputValidator.isNull, []);
        return this;
    };

    this.validLocale = function() {
        _addtest('validLocale', InputValidator.isValidLocale, []);
        return this;
    };

    this.string = function() {
        _addtest('string', InputValidator.isString, []);
        return this;
    };

    this.lengthMax = function(max) {
        _addtest('lengthMax', InputValidator.isLengthMax, [max]);
        return this;
    };

    this.lengthMin = function(min) {
        _addtest('lengthMin', InputValidator.isLengthMin, [min]);
        return this;
    };

    this.alphanumeric = function(locale) {
        _addtest('alphanumeric', InputValidator.isAlphanumeric, [locale]);
        return this;
    };

    this.regexMatch = function(pattern) {
        _addtest('regexMatch', InputValidator.isRegexMatch, [pattern]);
        return this;
    };

    this.numberAsString = function() {
        _addtest('numberAsString', InputValidator.isNumberAsString, []);
        return this;
    };

    this.email = function() {
        _addtest('email', InputValidator.isEmail, []);
        return this;
    };

    this.emptyString = function() {
        _addtest('emptyString', InputValidator.isEmptyString, []);
        return this;
    };

    this.greaterThan = function(mark) {
        mark = !(InputValidator.isNumber(mark) || InputValidator.isNumberAsString(mark)) ? false : InputValidator._toNumber(mark);
        _addtest('greaterThan', InputValidator.isGreaterThan, [mark], this.desc);
        return this;
    };

    this.lessThan = function(mark) {
        mark = !(InputValidator.isNumber(mark) || InputValidator.isNumberAsString(mark)) ? false : InputValidator._toNumber(mark);
        _addtest('lessThan', InputValidator.isLessThan, [mark], this.desc);
        return this;
    };

    this.equal = function(mark) {
        _addtest('equal', InputValidator.isEqual, [mark]);
        return this;
    };

    this.notEqual = function(mark) {
        _addtest('notEqual', InputValidator.isNotEqual, [mark]);
        return this;
    };

    this.url = function() {
        _addtest('url', InputValidator.isUrl, []);
        return this;
    };

    this.ipv4 = function() {
        _addtest('ipv4', InputValidator.isIpv4, []);
        return this;
    };

    this.arrayAsString = function() {
        _addtest('arrayAsString', InputValidator.isArrayAsString, []);
        return this;
    };

    this.ipv6 = function() {
        _addtest('ipv6', InputValidator.isIpv6, []);
        return this;
    };

    this.jsonString = function() {
        _addtest('jsonString', InputValidator.isJsonString, []);
        return this;
    };

    this.inList = function(l) {
        _addtest('inList', InputValidator.inList, [l]);
        return this;
    };

    this.notInList = function(l) {
        _addtest('notInList', InputValidator.notInList, [l]);
        return this;
    };

    // all other tooling

    this.version = function () {
        return Config.version;
    };

    this.new = function(newdescr) {
        return (new Shorthand()).init(newdescr, this.id);
    };

    this.init = function (descr, parent) {
        instance++;
        this.id = instance;
        _descr = (typeof descr === 'undefined' || descr === '') ? 'Shorthand_'+instance : descr;
        _parent = (typeof parent === 'undefined') ? '' : parent;
        this.desc = _descr;
        this.parent = _parent;
        return this;
    };
}

module.exports = (new Shorthand()).init('', '');
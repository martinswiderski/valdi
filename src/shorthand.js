'use strict';
var Config = require('./config'),
    instance = 0,
    InputValidator = require('./input-validator');

function Shorthand() {
    this.id     = -1;
    this._value  = null;
    this.desc   = null;
    this.parent = null;
    var _parent  = '',
        _value   = '',
        _descr   = '',
        _tests   = {},
        _results = {};

    function _executeValidation(desc, id, parent) {

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
        _results.status = (_results.all > 0 && _results.errors === 0) ? true : false;
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

    function _functionName(removeClass) {
        return (removeClass === true)
            ? (new Error('name')).stack.toString().split('at ')[2].split(' ')[0].replace('Shorthand.', '')
            : (new Error('name')).stack.toString().split('at ')[2].split(' ')[0];
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
            this.parent
        );

        //if (JSON.stringify(_results).indexOf(' trouble')>-1) {
        //    _results._tests = _tests;
        //    console.log(JSON.stringify(_results, null, 2));
        //}

        return _results.status;
    };

    // validators

    this.number = function(ish) {
        if (typeof ish !== 'undefined') {
            _addtest(_functionName(true), InputValidator.isNumber, [true]);
        } else {
            _addtest(_functionName(true), InputValidator.isNumber, []);
        }
        return this;
    };

    this.integer = function(ish) {
        if (typeof ish !== 'undefined') {
            _addtest(_functionName(true), InputValidator.isInteger, [true]);
        } else {
            _addtest(_functionName(true), InputValidator.isInteger, []);
        }
        return this;
    };

    this.integerAsString = function() {
        _addtest(_functionName(true), InputValidator.isIntegerAsString, []);
        return this;
    };

    this.real = function(ish) {
        if (typeof ish !== 'undefined') {
            _addtest(_functionName(true), InputValidator.isReal, [true]);
        } else {
            _addtest(_functionName(true), InputValidator.isReal, []);
        }
        return this;
    };

    this.realAsString = function() {
        _addtest(_functionName(true), InputValidator.isRealAsString, []);
        return this;
    };

    this.bool = function() {
        _addtest(_functionName(true), InputValidator.isBool, []);
        return this;
    };

    this.base64 = function() {
        _addtest(_functionName(true), InputValidator.isBase64, []);
        return this;
    };

    this.null = function() {
        _addtest(_functionName(true), InputValidator.isNull, []);
        return this;
    };

    this.validLocale = function() {
        _addtest(_functionName(true), InputValidator.isValidLocale, []);
        return this;
    };

    this.string = function() {
        _addtest(_functionName(true), InputValidator.isString, []);
        return this;
    };

    this.alphanumeric = function(locale) {
        _addtest(_functionName(true), InputValidator.isAlphanumeric, [locale]);
        return this;
    };

    this.regexMatch = function(pattern) {
        _addtest(_functionName(true), InputValidator.isRegexMatch, [pattern]);
        return this;
    };

    this.numberAsString = function() {
        _addtest(_functionName(true), InputValidator.isNumberAsString, []);
        return this;
    };

    this.email = function() {
        _addtest(_functionName(true), InputValidator.isEmail, []);
        return this;
    };

    this.emptyString = function() {
        _addtest(_functionName(true), InputValidator.isEmptyString, []);
        return this;
    };

    this.greaterThan = function(mark) {
        mark = !(InputValidator.isNumber(mark) || InputValidator.isNumberAsString(mark)) ? false : InputValidator._toNumber(mark);
        _addtest(_functionName(true), InputValidator.isGreaterThan, [mark], this.desc);
        return this;
    };

    this.lessThan = function(mark) {
        mark = !(InputValidator.isNumber(mark) || InputValidator.isNumberAsString(mark)) ? false : InputValidator._toNumber(mark);
        _addtest(_functionName(true), InputValidator.isLessThan, [mark], this.desc);
        return this;
    };

    this.equal = function(mark) {
        _addtest(_functionName(true), InputValidator.isEqual, [mark]);
        return this;
    };

    this.notEqual = function(mark) {
        _addtest(_functionName(true), InputValidator.isNotEqual, [mark]);
        return this;
    };

    this.url = function() {
        _addtest(_functionName(true), InputValidator.isUrl, []);
        return this;
    };

    this.ipv4 = function() {
        _addtest(_functionName(true), InputValidator.isIpv4, []);
        return this;
    };

    this.arrayAsString = function() {
        _addtest(_functionName(true), InputValidator.isArrayAsString, []);
        return this;
    };

    this.ipv6 = function() {
        _addtest(_functionName(true), InputValidator.isIpv6, []);
        return this;
    };

    this.jsonString = function() {
        _addtest(_functionName(true), InputValidator.isJsonString, []);
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
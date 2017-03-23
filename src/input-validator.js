'use strict';
var Config = require('./config'),
    Inspector = require('./inspector'),
    StringTool = require('./string-tool'),
    Validator = require('validator'),
    ipv4 = require('ip-address').Address4,
    ipv6 = require('ip-address').Address6,
    csv = require('csv-string'),
    supportedLocales = {
        locale: {
            en: true,
            de: true,
            ar: true,
            fr: true,
            ja: true
        },
        pattern: {
            en: /^([a-zA-Z0-9 \t'-_-]+)$/,
            de: /^([a-zA-Z0-9 \t'-_-\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df]+)$/,
            fr: /^([a-zA-Z0-9 \t'-_-\u00c9\u00c0\u00c8\u00d9\u00c2\u00ca\u00ce\u00d4\u00db\u00c7\u00cb\u00cf\u00dc\u00e9\u00e0\u00e8\u00f9\u00e2\u00ea\u00ee\u00f4\u00fb\u00e7\u00eb\u00ef\u00fc]+)$/,
            ar: /^([a-zA-Z0-9 \t'-_-\u0600-\u06FF]+)$/,
            ja: /[一-龠0-9 \t'-_-]+|[ぁ-ゔ0-9 \t'-_-]+|[ァ-ヴー0-9 \t'-_-]+|[a-zA-Z0-9]+|[ａ-ｚＡ-Ｚ０-９ \t]+[々〆〤0-9 \t'-_-]+/
        }
    };


function valid24hoursTime(input) {

};

function InputValidator () {

    this.init = function () {
        // all steps wiring the object here
        return this;
    };

    this.version = function() {
        return Config.version;
    };

    this.isNumber = function(val, matchStrings) {
        if (typeof matchStrings !== 'undefined'
            && matchStrings === true && iv().isNumberAsString(val)) {
            val = iv()._toNumber(val);
        }
        return typeof val === 'number';
    };

    this.isTime24 = function (val) {
        return valid24hoursTime(val);
    };
    
    this.isInteger = function(val, matchStrings) {
        if (typeof matchStrings !== 'undefined'
            && matchStrings === true && iv().isIntegerAsString(val)) {
            val = iv()._toInteger(val);
        }
        return iv().isNumber(val) && '' + parseInt(val, 10) === ('' + val);
    };
    
    this.isReal = function(val, matchStrings) {
        if (typeof matchStrings !== 'undefined'
            && matchStrings === true && iv().isRealAsString(val)) {
            val = iv()._toReal(val);
        }
        return iv().isNumber(val) && '' + parseInt(val, 10) !== ('' + val);
    };

    this.isBool = function(val) {
        return val === true || val === false;
    };
    
    this.isNull = function(val) {
        return null === val;
    };
    
    this.isValidLocale = function(val) {
        return !supportedLocales.locale[val] ? false : true;
    };
    
    this.isString = function(val) {
        return typeof val === 'string';
    };

    this.isAlphanumeric = function(val, locale) {
        if (!iv().isString(val) || !iv().isValidLocale(locale)) {
            return false;
        } else {
            return iv().isRegexMatch(val, supportedLocales.pattern[locale]);
        }
    };

    this.isRegexMatch = function(val, pattern) {
        if (!iv().isString(val)) {
            return false; // bad input
        } else {
            var m = val.match(pattern);
            return (m === null || !m[0]) ? false : m[0] === val;
        }
    };

    this.isArrayAsString = function (string, emptyInvalid) {
        var arr = iv()._toArray(string, emptyInvalid);
        return (arr !== false) ? true : false;
    };

    this._toArray = function(string, emptyInvalid) {
        var arr = '';
        if (!iv().isBool(emptyInvalid)) {
            emptyInvalid = true;
        }
        if (!iv().isString(string)) {
            return false;
        }
        if (iv().isJsonString(string)) {
            arr = JSON.parse(string);
        } else {
            arr = csv.parse(string);
            arr = (!arr[0]) ? [] : arr[0];
        }
        if (emptyInvalid === true) {
            return (arr.length === 0) ? false : arr;
        } else {
            return arr;
        }
    };
    
    this.isNumberAsString = function(val) {
        return iv().isRealAsString(val)
            || iv().isIntegerAsString(val);
    };

    this._toNumber = function(val) {
        if (iv().isIntegerAsString(val)) {
            return iv()._toInteger(val);
        } else if (iv().isRealAsString(val)) {
            return iv()._toReal(val);
        } else {
            return val;
        }
    };

    this._toInteger = function(val) {
        if (iv().isIntegerAsString(val)) {
            return parseInt(val);
        } else {
            return val;
        }
    };

    this._toReal = function(val) {
        if (iv().isRealAsString(val)) {
            return parseFloat(val);
        } else {
            return val;
        }
    };

    this.isIntegerAsString = function(val) {
        return ''+val === '' + parseInt(val)*1;
    };

    this.isRealAsString = function(val) {
        return ''+val === '' + parseFloat(val)*1;
    };

    this.isEmail = function(val) {
        return iv().isString(val) && Validator.isEmail(val);
    };
    
    this.isEmptyString = function(val) {
        return iv().isString(val) && 0 === val.length;
    };
    
    this.isGreaterThan = function(val, mark) {
        if (ins().name(val) === 'boolean'
            || ins().name(mark) === 'boolean') {
            return false;
        }
        val  = (iv().isNumber(val) || iv().isNumberAsString(val)) ? iv()._toNumber(val) : val;
        mark = (iv().isNumber(mark) || iv().isNumberAsString(mark)) ? iv()._toNumber(mark) : mark;
        //console.log('isGreaterThan');
        //console.log('val');
        //console.log(typeof val);
        //console.log(val);
        //console.log('merk');
        //console.log(typeof mark);
        //console.log(mark);
        //console.log('expression');
        //console.log(val > mark);
        return (val > mark);
    };
    
    this.isLessThan = function(val, mark) {
        if (ins().name(val) === 'boolean'
            || ins().name(mark) === 'boolean') {
            return false;
        }
        val  = (iv().isNumber(val) || iv().isNumberAsString(val)) ? iv()._toNumber(val) : val;
        mark = (iv().isNumber(mark) || iv().isNumberAsString(mark)) ? iv()._toNumber(mark) : mark;
        return (mark > val);
    };
    
    this.isEqual = function(val, mark) {
        if (val === mark) {
            return true;
        } else if (iv()._toNumber(val) === iv()._toNumber(mark)) {
            return true;
        } else if (iv()._toString(val) === iv()._toString(mark)) {
            return true;
        } else {
            return false;
        }
    };
    
    this.isNotEqual = function(val, mark) {
        return !iv().isEqual(val, mark);
    };

    this.inList = function(val, list) {
        if (iv().isString(list)) {
            list = iv()._toArray(list);
            if (list === false) {
                list = [];
            }
        }
        var lu = iv()._arrayToLookup(list);
        return !lu[val] ? false : true;
    };

    this._arrayToLookup = function(arr) {
        var lu = {};
        if (arr.push) for (var k in arr)  lu[arr[k]] = true;
        return lu;
    };

    this.notInList = function(val, list) {
        return !iv().inList(val, list);
    };

    this.stringContains = function(val, string) {
        if (!iv().isString(val) || !iv().isString(string)) return false;
        return 0 < StringTool.countOccurrence(val, string);
    };

    this._toString = function (input) {
        return (!iv().isString(input)) ? (new String(input)).valueOf() : input;
    };

    this.isBase64 = function(val) {
        return Validator.isBase64(
            iv()._toString(val)
        );
    };

    this.isUrl = function(val) {
        return Validator.isURL(
            iv()._toString(val)
        );
    };

    this.isIpv4 = function(val) {
        var addr = new ipv4(iv()._toString(val));
        return addr.isValid();
    };

    this.isIpv6 = function(val) {
        var addr = new ipv6(iv()._toString(val));
        return addr.isValid();
    };

    this.isJsonString = function(val) {
        return Validator.isJSON(
            iv()._toString(val)
        );
    };    
}

var _ins = false,
    _iv = false;
function iv() {
    if (_iv === false) {
        _iv = (new InputValidator()).init();
    }
    return _iv;
}

function ins() {
    if (_ins === false) {
        _ins = Inspector;
    }
    return _ins;
}

module.exports = (new InputValidator()).init();

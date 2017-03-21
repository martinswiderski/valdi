'use strict';

/**
 * Overloading String() prototype
 * @returns {string} Encoded string
 */
String.prototype.toHtmlEntities = function() {
    return this.replace(/./gm, function(s) {
        return '&#' + s.charCodeAt(0) + ';';
    });
};

/**
 * Overloading String() prototype
 * @param string     HTML Entities encoded
 * @returns {string} Decoded string
 */
String.prototype.fromHtmlEntities = function(string) {
    return (string+'').replace(/&#\d+;/gm,function(s) {
        return String.fromCharCode(s.match(/\d+/gm)[0]);
    });
};

function HtmlEntities() {

    this.isValid = function (string) {
        if (typeof string !== 'string') {
            return false;
        } else {
            return string === this.encode(this.decode(string));
        }
    };
    this.encode = function(string) {
        return (new String(string)).toHtmlEntities();
    };
    this.decode = function(string) {
        return (new String(string)).fromHtmlEntities(string);
    };
}

module.exports = new HtmlEntities();

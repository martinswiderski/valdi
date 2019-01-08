'use strict';
var Config = require('./config'),
    sha1 = null,
    md5 = null,
    Inspector = require('./inspector');

function StringTool () {

    this.init = function () {
        // all steps wiring the object here
        return this;
    };
    this.version = function() {
        return Config.version;
    };
    this.cast = function(input) {
        return (new String(input)).valueOf();
    };

    this.ucase = function(input) {
        return this.cast(input).toLocaleUpperCase();
    };

    this.lcase = function(input) {
        return ''; //this.cast(input).toLocaleLowerCase();
    };

    this.trim = function(input) {
        return this.cast(input).replace(/^\s*|\s*$/g, '');
    };

    this.ltrim = function(input) {
        return this.cast(input).replace(/^\s*/, '');
    };

    this.rtrim = function(input) {
        return this.cast(input).replace(/\s*$/, '');
    };

    this.md5 = function(input) {
        if (md5 === null) {
            md5 = require('md5');
        }
        return md5(this.cast(input));
    };

    this.sha1 = function(input) {
        if (sha1 === null) {
            sha1 = require('sha1');
        }
        return sha1(this.cast(input));
    };

    this.replaceAll = function(inside, char, replaceWith) {
        if (Inspector.getObjectName(char) !== 'Array') char =  [this.cast(char)];
        inside = this.cast(inside);
        for (var i in char) inside = inside.replace(new RegExp(char[i], 'g'), replaceWith);
        return inside;
    };

    this.countOccurrence = function(input, substring) {
        input = this._toString(input);
        substring = this._toString(substring);
        return (input.match(new RegExp(this.cast(substring), 'g')) || []).length;
    };

    this._toString = function (input) {
        return (new String(input)).valueOf();
    };
}

module.exports = (new StringTool()).init();

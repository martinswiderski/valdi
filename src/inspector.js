'use strict';
var Config = require('./config'),
    _instance = false;

function _Inspector () {
    this.getType = function(subject) {
        return null === subject ? 'null' : typeof subject === 'undefined' ? 'undefined' : typeof subject;
    };
    this.getObjectName = function(obj) {
        return this.getType(obj) !== 'object' ? '' : obj.constructor.name;
    };
    this.type = function(subject) {
        return this.getType(subject);
    };
    this.name = function(subject) {
        var out = this.getType(subject);
        if (out === 'object') out = this.getObjectName(subject);
        return out;
    };
    this.init = function () {
        // all steps wiring the object here
        return this;
    };
    this.version = function() {
        return Config.version;
    };
}

function _self() {
    if (_instance === false) {
        _instance = (new _Inspector()).init();
    }
    return _instance;
}

module.exports = (_self()).init();

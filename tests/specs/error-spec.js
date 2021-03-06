var path = require('path'),
    fs = require('fs'),
    md5 = require('md5'),
    ValdiError = require('./../../src/error'),
    _err = false,
    _details = [],
    Valdi = require('./../../index');

console.log('MD5: ' + md5(fs.readFileSync(__filename)) + ' File: ' + path.basename(__filename));

describe('Has custom error class', function () {

    _details = [
        'This is details Array',
        'which I can populate',
        'with important error details'
    ];

    try {
        throw new ValdiError('I can throw it', _details);
    } catch (err) {
        _err = err;
    }

    it('Which is throwable', function () {
        expect(typeof _err !== 'boolean').toBe(true);
        expect(typeof _err).toBe('object');
        expect(typeof _err.message).toBe('string');
        expect(_err.message).toBe('I can throw it');
    });

    it('Can also have details appended to it', function () {
        expect(typeof _err.details).toBe('object');
        expect(_err.details.length).toBe(3);
        expect(JSON.stringify(_err.details)).toBe(JSON.stringify(_details));
    });
});





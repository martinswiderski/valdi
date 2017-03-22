var path = require('path'),
    fs = require('fs'),
    md5 = require('md5'),
    Config = require('./../../src/config');

console.log('MD5: ' + md5(fs.readFileSync(__filename)) + ' File: ' + path.basename(__filename));

describe('Config', function () {
    it('Structure', function () {
        expect(typeof Config).toBe('object');
        expect(typeof Config.version).toBe('string');
        expect(typeof Config.published).toBe('string');
        expect(typeof Config.readme).toBe('string');
        expect(typeof Config.package).toBe('string');
    });
});


var Config = require('./../../src/config');

var testDetails = require('./_details/config-details.json');
console.log('MD5: ' + testDetails.md5 + ' File: ' + testDetails.file);

describe('Config', function () {
    it('Structure', function () {
        expect(typeof Config).toBe('object');
        expect(typeof Config.version).toBe('string');
        expect(typeof Config.published).toBe('string');
        expect(typeof Config.readme).toBe('string');
        expect(typeof Config.package).toBe('string');
    });
});


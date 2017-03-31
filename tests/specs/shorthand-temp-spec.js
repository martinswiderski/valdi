var Config = require('./../../src/config'),
    Inspect = require('./../../src/inspector'),
    Valdi = require('./../../index');

var testDetails = require('./_details/shorthand-details.json');
console.log('MD5: ' + testDetails.md5 + ' File: ' + 'TEMP');

var openingTime = Valdi.simple.new('Opening times 9 - 12 and 14 - 18'),
    beforeLunch = Valdi.simple.new('before the lunch break').and().integer().inList([9, 10, 11, 12]),
    afterLunch = Valdi.simple.new('after the lunch break').and().integer().min(14).max(18);

    openingTime.nested(beforeLunch).nested(afterLunch);

describe('Allows adding nested assertions', function () {
    it('must be instance of Shorthand', function () {
        expect(openingTime.value(8)).toBe(false);  // too early
        expect(openingTime.value(11)).toBe(true);
        expect(openingTime.value(13)).toBe(false); // lunch
        expect(openingTime.value(15)).toBe(true);
        expect(openingTime.value(20)).toBe(false); // too late
    });
});

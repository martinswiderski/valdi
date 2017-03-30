var //Valdi = require('./../../index'),
    InputValidator = require('./../../src/input-validator'),
    testdata = {
        German: {
            gebhardVonBluecher: 'Gebhard-Leberecht von Blücher Fürst von Wahlstatt 0123456789',
        },
        Arabic: {
            salahAdDin: 'صلاحالدينيوسفبنأيوب0123456789'
        },
        Japanese: {
            miyamotoMusashi: '宮本武蔵 0123456789'
        },
        English: {
            christopherMarlowe: 'Christopher Marlowe\'s 0123456789'
        },
        French: {
            deSaintExupery: 'AntoineDeSaint-Exupéry0123456789'
        }
    };

var testDetails = require('./_details/input-validator-alphanum-details.json');
console.log('MD5: ' + testDetails.md5 + ' File: ' + testDetails.file);

describe('InputValidator', function () {
    it('isRegexMatch 1', function () {
        expect(InputValidator.isRegexMatch('0123456789', /^\w+$/)).toBe(true);
        expect(InputValidator.isRegexMatch('0123456789 (bad)', /^\w+$/)).toBe(false);
        expect(InputValidator.isRegexMatch({ object: 'is-not-string' }, /^\w+$/)).toBe(false);
        expect(InputValidator.isRegexMatch(null, /^\w+$/)).toBe(false);
        expect(InputValidator.isRegexMatch(false, /^\w+$/)).toBe(false);
    });
    it('isRegexMatch 2', function () {
        expect(InputValidator.isRegexMatch('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456', /^\w+$/)).toBe(true);
        expect(InputValidator.isRegexMatch('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456 (bad)', /^\w+$/)).toBe(false);
    });
});

describe('InputValidator', function () {
    it('isAlphanumeric', function () {
        expect(InputValidator.isAlphanumeric(testdata.English.christopherMarlowe, 'en')).toBe(true);
        expect(InputValidator.isAlphanumeric(testdata.German.gebhardVonBluecher, 'de')).toBe(true);
        expect(InputValidator.isAlphanumeric(testdata.French.deSaintExupery, 'fr')).toBe(true);
        expect(InputValidator.isAlphanumeric(testdata.Japanese.miyamotoMusashi, 'ja')).toBe(true);
        expect(InputValidator.isAlphanumeric(testdata.Arabic.salahAdDin, 'ar')).toBe(true);
    });
    it('isAlphanumeric non string', function () {
        expect(InputValidator.isAlphanumeric({ not: 'string' }, 'ja')).toBe(false);
        expect(InputValidator.isAlphanumeric({ not: 'string' }, 'en')).toBe(false);
        expect(InputValidator.isAlphanumeric({ not: 'string' }, 'ar')).toBe(false);
        expect(InputValidator.isAlphanumeric({ not: 'string' }, 'de')).toBe(false);
    });
    it('isAlphanumeric unsupported locale', function () {
        expect(InputValidator.isAlphanumeric(testdata.Japanese.miyamotoMusashi, 'ru')).toBe(false);
        expect(InputValidator.isAlphanumeric(testdata.Arabic.salahAdDin, 'ru')).toBe(false);
        expect(InputValidator.isAlphanumeric(testdata.German.gebhardVonBluecher, 'ru')).toBe(false);
        expect(InputValidator.isAlphanumeric(testdata.French.deSaintExupery, 'ru')).toBe(false);
    });
});
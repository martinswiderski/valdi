var path = require('path'),
    fs = require('fs'),
    md5 = require('md5'),
    InputValidator = require('./../../src/input-validator');


console.log('MD5: ' + md5(fs.readFileSync(__filename)) + ' File: ' + path.basename(__filename));

describe('Basic checks', function () {

    it('Method InputValidator.isNumber', function () {
        expect(InputValidator.isNumber(false)).toBe(false);
        expect(InputValidator.isNumber('ABC')).toBe(false);
        expect(InputValidator.isNumber('')).toBe(false);
        expect(InputValidator.isNumber({ obj: true })).toBe(false);
        expect(InputValidator.isNumber(1234)).toBe(true);
        expect(InputValidator.isNumber(10.11)).toBe(true);
    });

    it('Method InputValidator.isMin', function () {
        expect(InputValidator.isMin({ obj: true }, 100)).toBe(false);
        expect(InputValidator.isMin(false, 100)).toBe(false);
        expect(InputValidator.isMin(4, 3)).toBe(true);
        expect(InputValidator.isMin(-1, 0.3)).toBe(false);
        expect(InputValidator.isMin(4.45, 3.99)).toBe(true);
        expect(InputValidator.isMin(-1.01, 0.3)).toBe(false);
    });

    it('Method InputValidator.isMax', function () {
        expect(InputValidator.isMax({ obj: true }, 100)).toBe(false);
        expect(InputValidator.isMax(false, 100)).toBe(false);
        expect(InputValidator.isMax(40, 100)).toBe(true);
        expect(InputValidator.isMax(1.91, 1.99)).toBe(true);
        expect(InputValidator.isMax(6.1, 6.11)).toBe(true);
        expect(InputValidator.isMax(-5, -3.14)).toBe(true);
    });

    it('Method InputValidator._toNumber', function () {
        expect(InputValidator._toNumber(false)).toBe(false);
        expect(InputValidator._toNumber('ABC')).toBe('ABC');
        expect(InputValidator._toNumber('1.7')).toBe(1.7);
        expect(InputValidator._toNumber('1234')).toBe(1234);
    });

    it('Method InputValidator.isNumberAsString', function () {
        expect(InputValidator.isNumberAsString(false)).toBe(false);
        expect(InputValidator.isNumberAsString('67.14')).toBe(true);
        expect(InputValidator.isNumberAsString('334567')).toBe(true);
    });

    it('Method InputValidator.isInteger', function () {
        expect(InputValidator.isInteger(false)).toBe(false);
        expect(InputValidator.isInteger(14.56)).toBe(false);
        expect(InputValidator.isInteger(1234)).toBe(true);
    });

    it('Method InputValidator._toInteger', function () {
        expect(InputValidator._toInteger('1')).toBe(1);
        expect(InputValidator._toInteger('2345')).toBe(2345);
        expect(InputValidator._toInteger(false)).toBe(false);
        expect(InputValidator._toInteger('ABCDEFG')).toBe('ABCDEFG');
    });

    it('Method InputValidator.isIntegerAsString', function () {
        expect(InputValidator.isIntegerAsString(false)).toBe(false);
        expect(InputValidator.isIntegerAsString('3456')).toBe(true);
    });

    it('Method InputValidator.isReal', function () {
        expect(InputValidator.isReal(false)).toBe(false);
        expect(InputValidator.isReal(2.15)).toBe(true);
        expect(InputValidator.isReal('2.56')).toBe(false);
    });

    it('Method InputValidator._toReal', function () {
        expect(InputValidator._toReal('1')).toBe(1);
        expect(InputValidator._toReal('2345')).toBe(2345);
        expect(InputValidator._toReal(false)).toBe(false);
        expect(InputValidator._toReal('1.23')).toBe(1.23);
    });

    it('Method InputValidator.isRealAsString', function () {
        expect(InputValidator.isRealAsString(false)).toBe(false);
        expect(InputValidator.isRealAsString('3.14')).toBe(true);
    });

    it('Method InputValidator.isBool', function () {
        expect(InputValidator.isBool(false)).toBe(true);
        expect(InputValidator.isBool(true)).toBe(true);
        expect(InputValidator.isBool(null)).toBe(false);
        expect(InputValidator.isBool({ obj: true })).toBe(false);
    });

    it('Method InputValidator.isNull', function () {
        expect(InputValidator.isNull(null)).toBe(true);
        expect(InputValidator.isNull(false)).toBe(false);
        expect(InputValidator.isNull({ obj: true})).toBe(false);
    });

    it('Method InputValidator.isValidLocale', function () {
        expect(InputValidator.isValidLocale(false)).toBe(false);
        expect(InputValidator.isValidLocale('en')).toBe(true);
        expect(InputValidator.isValidLocale('ar')).toBe(true);
        expect(InputValidator.isValidLocale('ja')).toBe(true);
        expect(InputValidator.isValidLocale('de')).toBe(true);
        expect(InputValidator.isValidLocale('invalid')).toBe(false);
    });

    it('Method InputValidator.isString', function () {
        expect(InputValidator.isString(false)).toBe(false);
        expect(InputValidator.isString({ obj: true })).toBe(false);
        expect(InputValidator.isString(112.33)).toBe(false);
        expect(InputValidator.isString('Valid string')).toBe(true);
    });

    it('Method InputValidator.isLengthMax', function () {
        expect(InputValidator.isLengthMax({ obj: true }, 100)).toBe(false);
        expect(InputValidator.isLengthMax(false, 100)).toBe(false);
        expect(InputValidator.isLengthMax('ABCDE', 5)).toBe(true);
        expect(InputValidator.isLengthMax('ZCYZCY', 3)).toBe(false);
        expect(InputValidator.isLengthMax('', 3)).toBe(true);
    });

    it('Method InputValidator.isLengthMin', function () {
        expect(InputValidator.isLengthMin({ obj: true }, 100)).toBe(false);
        expect(InputValidator.isLengthMin(false, 100)).toBe(false);
        expect(InputValidator.isLengthMin('AA', 5)).toBe(false);
        expect(InputValidator.isLengthMin('Hello World', 3)).toBe(true);
    });


    it('Method InputValidator.isNumberAsString', function () {
        expect(InputValidator.isNumberAsString(false)).toBe(false);
        expect(InputValidator.isNumberAsString('102')).toBe(true);
        expect(InputValidator.isNumberAsString('3.1435')).toBe(true);
    });

    it('Method InputValidator.isEmail', function () {
        expect(InputValidator.isEmail('martin.swiderski@gmail.com')).toBe(true);
        expect(InputValidator.isEmail('spooks@8ig.uk')).toBe(true);
        expect(InputValidator.isEmail(false)).toBe(false);
    });

    it('Method InputValidator.isEmptyString', function () {
        expect(InputValidator.isEmptyString('')).toBe(true);
        expect(InputValidator.isEmptyString(' ')).toBe(false);
        expect(InputValidator.isEmptyString(false)).toBe(false);
    });

    it('Method InputValidator.isGreaterThan', function () {
        expect(InputValidator.isLessThan(100, false)).toBe(false);
        expect(InputValidator.isGreaterThan(false, 100)).toBe(false);
        expect(InputValidator.isGreaterThan(false, 100)).toBe(false);
        expect(InputValidator.isGreaterThan(1, 0)).toBe(true);
        expect(InputValidator.isGreaterThan(32, 25)).toBe(true);
        expect(InputValidator.isGreaterThan('1', '0')).toBe(true);   // Supports comparing strings
        expect(InputValidator.isGreaterThan('32', '25')).toBe(true); // as well as numbers
    });

    it('Method InputValidator.isLessThan', function () {
        expect(InputValidator.isLessThan(false, 100)).toBe(false);
        expect(InputValidator.isLessThan(3, 100)).toBe(true);
        expect(InputValidator.isLessThan('5', 100)).toBe(true);
        expect(InputValidator.isLessThan(3, '767')).toBe(true);
        expect(InputValidator.isLessThan('7', '11')).toBe(true);
    });

    it('Method InputValidator.isEqual', function () {
        expect(InputValidator.isEqual('AA', 'BB')).toBe(false);
        expect(InputValidator.isEqual('ABC', 'ABC')).toBe(true);
        expect(InputValidator.isEqual(false, true)).toBe(false);
        expect(InputValidator.isEqual(0, '0000')).toBe(false);
        expect(InputValidator.isEqual('a', 'a')).toBe(true);
        expect(InputValidator.isEqual(1, 1)).toBe(true);
        expect(InputValidator.isEqual('22', '22')).toBe(true);
        expect(InputValidator.isEqual(22, '22')).toBe(true);
        expect(InputValidator.isEqual(7.0, '7')).toBe(true);
    });

    it('Method InputValidator.isNotEqual', function () {
        expect(InputValidator.isNotEqual(1, 2)).toBe(true);
        expect(InputValidator.isNotEqual(false, 0)).toBe(true);
        expect(InputValidator.isNotEqual('000', 0)).toBe(true);
        expect(InputValidator.isNotEqual(false, false)).toBe(false);
    });

    it('Method InputValidator.isArrayAsString', function () {
        expect(InputValidator.isArrayAsString('["8.8.8.8","2001:4860:4860::8888","2001:4860:4860::8844"]')).toBe(true);
        expect(InputValidator.isArrayAsString('"8.8.8.8","2001:4860:4860::8888","2001:4860:4860::8844"')).toBe(true);
        expect(InputValidator.isArrayAsString('8.8.8.8,2001:4860:4860::8888,2001:4860:4860::8844')).toBe(true);
        expect(InputValidator.isArrayAsString(false)).toBe(false);
        expect(InputValidator.isArrayAsString([1, 2,3])).toBe(false);
    });

    it('Method InputValidator._toArray', function () {
        expect(md5(JSON.stringify(InputValidator._toArray('["8.8.8.8","2001:4860:4860::8888","2001:4860:4860::8844"]', true))))
            .toBe(md5('["8.8.8.8","2001:4860:4860::8888","2001:4860:4860::8844"]'));
        expect(md5(JSON.stringify(InputValidator._toArray('', false))))
            .toBe(md5('[""]')); // empty returned
        expect(InputValidator._toArray('[]', true))
            .toBe(false); // false returned
    });

    it('Method InputValidator.inList', function () {
        expect(InputValidator.inList('A', ['A', 'B'])).toBe(true);
        expect(InputValidator.inList('X', ['A', 'B'])).toBe(false);
        expect(InputValidator.inList('X', 'this is not a list')).toBe(false);
        expect(InputValidator.inList('8.8.8.8', '["8.8.8.8","2001:4860:4860::8888","2001:4860:4860::8844"]')).toBe(true);
        expect(InputValidator.inList('2001:4860:4860::8844', '"8.8.8.8","2001:4860:4860::8888","2001:4860:4860::8844"')).toBe(true);
        expect(InputValidator.inList('2001:4860:4860::8888', '8.8.8.8,2001:4860:4860::8888,2001:4860:4860::8844')).toBe(true);
    });

    it('Method InputValidator.notInList', function () {
        expect(InputValidator.notInList(1, [3, 4, 5])).toBe(true);
        expect(InputValidator.notInList(4, [3, 4, 5])).toBe(false); // @todo: driving list by string case
    });

    it('Method InputValidator.stringContains', function () {
        expect(InputValidator.stringContains(false, 'a')).toBe(false);
        expect(InputValidator.stringContains('false', 'a')).toBe(true);
    });

    it('Method InputValidator._toString', function () {
        expect(InputValidator._toString(false)).toBe('false');
        expect(InputValidator._toString(null)).toBe('null');
        expect(InputValidator._toString(1.2345)).toBe('1.2345');
        expect(InputValidator._toString(456)).toBe('456');
    });

    it('Method InputValidator.isBase64', function () {
        expect(InputValidator.isBase64(false)).toBe(false);
        expect(
            InputValidator.isBase64('SXQgd2FzIGxvdmUgYXQgZmlyc3Qgc2lnaHQuIFRoZSBmaXJzdCB0aW1lIFlvc3NhcmlhbiBzYXcgdGhlIGNoYXBsYWluIGhlIGZlbGwgbWFkbHkgaW4gbG92ZSB3aXRoIGhpbQ==')
        ).toBe(true);
    });

    it('Method InputValidator.isUrl', function () {
        expect(InputValidator.isUrl(false)).toBe(false);
        expect(
            InputValidator.isUrl('http://www.ebay.co.uk/itm/UK-JXD-509G-RC-Drone-Quadcopter-with-HD-Monitor-Camera-5-8G-FPV-Altitude-Hold-/302047008243?hash=item46536795f3:g:H-EAAOSw0UdXtrcB')
        ).toBe(true);
    });

    it('Method InputValidator.isIpv4', function () {
        expect(InputValidator.isIpv4(false)).toBe(false);
        expect(InputValidator.isIpv4('192.168.1.1')).toBe(true);
        expect(InputValidator.isIpv4('8.8.8.8')).toBe(true);
    });

    it('Method InputValidator.isIpv6', function () {
        expect(InputValidator.isIpv6(false)).toBe(false);
        expect(InputValidator.isIpv6('2001:4860:4860::8888')).toBe(true);
        expect(InputValidator.isIpv6('2001:4860:4860::8844')).toBe(true);
    });

    it('Method InputValidator.isJsonString', function () {
        expect(InputValidator.isJsonString(false)).toBe(false);
        expect(InputValidator.isJsonString('{"dns":{"google":{"ipv4":["8.8.8.8"],"ipv6":["2001:4860:4860::8888","2001:4860:4860::8844"]}}}')).toBe(true);
    });

});

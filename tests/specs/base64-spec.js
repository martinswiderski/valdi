var Base64 = require('./../../src/base64'),
    Valdi = require('./../../index');

var testDetails = require('./_details/base64-details.json');
console.log('MD5: ' + testDetails.md5 + ' File: ' + testDetails.file);

describe('native Base64', function () {
    it('is', function () {
        expect(Base64.isValid('宮本 武蔵')).toBe(false);
        expect(Base64.isValid('ABC123')).toBe(false);
        expect(Base64.isValid('5a6u5pysIOatpuiUtQ==')).toBe(true);
        expect(Base64.isValid('QUJDMTIz')).toBe(true);
    });
    it('encode', function () {
        expect(Base64.encode('宮本 武蔵')).toBe('5a6u5pysIOatpuiUtQ==');
        expect(Base64.encode('ABC123')).toBe('QUJDMTIz');
    });
    it('decode', function () {
        expect(Base64.decode('5a6u5pysIOatpuiUtQ==')).toBe('宮本 武蔵');
        expect(Base64.decode('QUJDMTIz')).toBe('ABC123');
    });
});

describe('via Valdi.base64', function () {
    it('is', function () {
        expect(Valdi.base64.isValid('宮本 武蔵')).toBe(false);
        expect(Valdi.base64.isValid('ABC123')).toBe(false);
        expect(Valdi.base64.isValid('5a6u5pysIOatpuiUtQ==')).toBe(true);
        expect(Valdi.base64.isValid('QUJDMTIz')).toBe(true);
    });
    it('encode', function () {
        expect(Valdi.base64.encode('宮本 武蔵')).toBe('5a6u5pysIOatpuiUtQ==');
        expect(Valdi.base64.encode('ABC123')).toBe('QUJDMTIz');
    });
    it('decode', function () {
        expect(Valdi.base64.decode('5a6u5pysIOatpuiUtQ==')).toBe('宮本 武蔵');
        expect(Valdi.base64.decode('QUJDMTIz')).toBe('ABC123');
    });
});

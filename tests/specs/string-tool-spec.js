var path = require('path'),
    fs = require('fs'),
    md5 = require('md5'),
    Valdi = require('./../../index');

console.log('MD5: ' + md5(fs.readFileSync(__filename)) + ' File: ' + path.basename(__filename));

describe('String manupulations', function () {
    it('Casting string', function () {
        expect(
            Valdi.inspect.type(1.34)
        ).toBe('number');
        expect(Valdi.inspect.type(
            Valdi.string.cast(1.34)
        )).toBe('string');
    });
    it('replace all occurences of (sub)string', function () {
        expect(Valdi.string.replaceAll('AAABBD_ABC_BC_C', 'A', '')).toBe('BBD_BC_BC_C');
        expect(Valdi.string.replaceAll('AAABBD_ABC_BC_C', 'BC', '')).toBe('AAABBD_A__C');
        expect(Valdi.string.replaceAll('AAABBD_ABC_BC_C', ['A', 'C', '_'], '')).toBe('BBDBB');
    });
    it('trim', function () {
        expect(Valdi.string.trim('        Exegi monumentum aere perennius.     ')).toBe('Exegi monumentum aere perennius.');
    });
    it('ltrim', function () {
        expect(Valdi.string.ltrim('                  iamque opus exegi.    ')).toBe('iamque opus exegi.    ');
    });
    it('rtrim', function () {
        expect(Valdi.string.rtrim('    Si monumentum requiris, circumspice      ')).toBe('    Si monumentum requiris, circumspice');
    });
    it('ucase', function () {
        expect(Valdi.string.ucase('midgets raise')).toBe('MIDGETS RAISE');
    });
    it('lcase', function () {
        expect(Valdi.string.lcase('GIANTS CRUMBLE DOWN')).toBe('giants crumble down');
    });
    it('md5', function () {
        expect(Valdi.string.md5('There is a time for everything')).toBe('8b02b0b7d7c9cf9c1be68676698a3fdd');
    });
    it('sha1', function () {
        expect(Valdi.string.sha1('yet it all shall come to pass...')).toBe('93d90fb98869e7b157aafd3227e7a2e4dbee8c19');
    });
    it('count', function () {
        expect(Valdi.string.countOccurrence('yet it all shall come to pass...', 'BooBoo')).toBe(0);
        expect(Valdi.string.countOccurrence('yet it all shall come to pass...', 'yet')).toBe(1);
        expect(Valdi.string.countOccurrence('ABCABDABGABH', 'AB')).toBe(4);
    });
    it('count international', function () {
        expect(Valdi.string.countOccurrence('عبد الرحمن الثالث', 'لث')).toBe(2);                       // Arabic
        expect(Valdi.string.countOccurrence('宮本 武蔵', '本')).toBe(1);                                 // Japanese
        expect(Valdi.string.countOccurrence('Սայաթ-Նովա', 'ա')).toBe(3);                               // Armenian
        expect(Valdi.string.countOccurrence('საიათნოვა', 'ნ')).toBe(1);                                // Georgian
        expect(Valdi.string.countOccurrence('משה חיים לוצאטו', 'ם')).toBe(1);                            // Hebrew
        expect(Valdi.string.countOccurrence('Алекса́ндр Серге́евич Пу́шкин', 'р')).toBe(2);               // Russian
        expect(Valdi.string.countOccurrence('Gebhard von Blücher, Fürst von Wahlstatt', 'ü')).toBe(2); // German
    });
});


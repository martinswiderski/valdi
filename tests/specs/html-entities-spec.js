var HtmlEntities = require('./../../src/html-entities'),
    Validator = require('./../../index');

var testDetails = require('./_details/html-entities-details.json');
console.log('MD5: ' + testDetails.md5 + ' File: ' + testDetails.file);

describe('HtmlEntities implements tool methods for decoding and encoding of the HTML Entities', function () {
    it('isValid', function () {
        expect(HtmlEntities.isValid({ object: 'IsNotString' })).toBe(false);
        expect(HtmlEntities.isValid(false)).toBe(false);
        expect(HtmlEntities.isValid('William Shakespeare')).toBe(false);
        expect(HtmlEntities.isValid('عبد الرحمن الثالث')).toBe(false);
        expect(HtmlEntities.isValid('&#1593;&#1576;&#1583;&#32;&#1575;&#1604;&#1585;&#1581;&#1605;&#1606;&#32;&#1575;&#1604;&#1579;&#1575;&#1604;&#1579;')).toBe(true);
        expect(HtmlEntities.isValid('&#71;&#101;&#98;&#104;&#97;&#114;&#100;&#32;&#76;&#101;&#98;&#101;&#114;&#101;&#99;&#104;&#116;&#32;&#118;&#111;&#110;&#32;&#66;&#108;&#252;&#99;&#104;&#101;&#114;&#44;&#32;&#70;&#252;&#114;&#115;&#116;&#32;&#118;&#111;&#110;&#32;&#87;&#97;&#104;&#108;&#115;&#116;&#97;&#116;&#116;')).toBe(true);
    });
    it('Encode', function () {
        expect(HtmlEntities.encode('William Shakespeare'))
            .toBe('&#87;&#105;&#108;&#108;&#105;&#97;&#109;&#32;&#83;&#104;&#97;&#107;&#101;&#115;&#112;&#101;&#97;&#114;&#101;');
        expect(HtmlEntities.encode('عبد الرحمن الثالث'))
            .toBe('&#1593;&#1576;&#1583;&#32;&#1575;&#1604;&#1585;&#1581;&#1605;&#1606;&#32;&#1575;&#1604;&#1579;&#1575;&#1604;&#1579;');
        expect(HtmlEntities.encode('宮本 武蔵'))
            .toBe('&#23470;&#26412;&#32;&#27494;&#34101;');
        expect(HtmlEntities.encode('Gebhard Leberecht von Blücher, Fürst von Wahlstatt'))
            .toBe('&#71;&#101;&#98;&#104;&#97;&#114;&#100;&#32;&#76;&#101;&#98;&#101;&#114;&#101;&#99;&#104;&#116;&#32;&#118;&#111;&#110;&#32;&#66;&#108;&#252;&#99;&#104;&#101;&#114;&#44;&#32;&#70;&#252;&#114;&#115;&#116;&#32;&#118;&#111;&#110;&#32;&#87;&#97;&#104;&#108;&#115;&#116;&#97;&#116;&#116;');
    });
    it('Decode', function () {
        expect(HtmlEntities.decode('&#87;&#105;&#108;&#108;&#105;&#97;&#109;&#32;&#83;&#104;&#97;&#107;&#101;&#115;&#112;&#101;&#97;&#114;&#101;'))
            .toBe('William Shakespeare');
        expect(HtmlEntities.decode('&#1593;&#1576;&#1583;&#32;&#1575;&#1604;&#1585;&#1581;&#1605;&#1606;&#32;&#1575;&#1604;&#1579;&#1575;&#1604;&#1579;'))
            .toBe('عبد الرحمن الثالث');
        expect(HtmlEntities.decode('&#23470;&#26412;&#32;&#27494;&#34101;'))
            .toBe('宮本 武蔵');
        expect(HtmlEntities.decode('&#71;&#101;&#98;&#104;&#97;&#114;&#100;&#32;&#76;&#101;&#98;&#101;&#114;&#101;&#99;&#104;&#116;&#32;&#118;&#111;&#110;&#32;&#66;&#108;&#252;&#99;&#104;&#101;&#114;&#44;&#32;&#70;&#252;&#114;&#115;&#116;&#32;&#118;&#111;&#110;&#32;&#87;&#97;&#104;&#108;&#115;&#116;&#97;&#116;&#116;'))
            .toBe('Gebhard Leberecht von Blücher, Fürst von Wahlstatt');
    });
});

describe('Validator wraps tool methods for decoding and encoding of the HTML Entities', function () {
    it('Encode', function () {
        expect(Validator.htmlEntities.encode('William Shakespeare'))
            .toBe('&#87;&#105;&#108;&#108;&#105;&#97;&#109;&#32;&#83;&#104;&#97;&#107;&#101;&#115;&#112;&#101;&#97;&#114;&#101;');
        expect(Validator.htmlEntities.encode('عبد الرحمن الثالث'))
            .toBe('&#1593;&#1576;&#1583;&#32;&#1575;&#1604;&#1585;&#1581;&#1605;&#1606;&#32;&#1575;&#1604;&#1579;&#1575;&#1604;&#1579;');
        expect(Validator.htmlEntities.encode('宮本 武蔵'))
            .toBe('&#23470;&#26412;&#32;&#27494;&#34101;');
        expect(Validator.htmlEntities.encode('Gebhard Leberecht von Blücher, Fürst von Wahlstatt'))
            .toBe('&#71;&#101;&#98;&#104;&#97;&#114;&#100;&#32;&#76;&#101;&#98;&#101;&#114;&#101;&#99;&#104;&#116;&#32;&#118;&#111;&#110;&#32;&#66;&#108;&#252;&#99;&#104;&#101;&#114;&#44;&#32;&#70;&#252;&#114;&#115;&#116;&#32;&#118;&#111;&#110;&#32;&#87;&#97;&#104;&#108;&#115;&#116;&#97;&#116;&#116;');
    });
    it('Decode', function () {
        expect(Validator.htmlEntities.decode('&#87;&#105;&#108;&#108;&#105;&#97;&#109;&#32;&#83;&#104;&#97;&#107;&#101;&#115;&#112;&#101;&#97;&#114;&#101;'))
            .toBe('William Shakespeare');
        expect(Validator.htmlEntities.decode('&#1593;&#1576;&#1583;&#32;&#1575;&#1604;&#1585;&#1581;&#1605;&#1606;&#32;&#1575;&#1604;&#1579;&#1575;&#1604;&#1579;'))
            .toBe('عبد الرحمن الثالث');
        expect(Validator.htmlEntities.decode('&#23470;&#26412;&#32;&#27494;&#34101;'))
            .toBe('宮本 武蔵');
        expect(Validator.htmlEntities.decode('&#71;&#101;&#98;&#104;&#97;&#114;&#100;&#32;&#76;&#101;&#98;&#101;&#114;&#101;&#99;&#104;&#116;&#32;&#118;&#111;&#110;&#32;&#66;&#108;&#252;&#99;&#104;&#101;&#114;&#44;&#32;&#70;&#252;&#114;&#115;&#116;&#32;&#118;&#111;&#110;&#32;&#87;&#97;&#104;&#108;&#115;&#116;&#97;&#116;&#116;'))
            .toBe('Gebhard Leberecht von Blücher, Fürst von Wahlstatt');
    });
});

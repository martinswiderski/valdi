var Valdi = require('./../../index');

var testDetails = require('./_details/structure-details.json');
console.log('MD5: ' + testDetails.md5 + ' File: ' + testDetails.file);

var _config = require('./../../src/config'),
    _ver = _config.version;

describe('Validator exposes version number', function () {
    it('Version 0.0.1', function () {
        expect(Valdi.version()).toBe(_ver);
    });
});

describe('Valdi exposes valdi.inspect - inspector object', function () {
    it('Valdi.inspect', function () {
        expect(typeof Valdi.inspect).toBe('object');
        expect(Valdi.inspect.getObjectName(Valdi.inspect)).toBe('_Inspector');
        expect(Valdi.inspect.version()).toBe(_ver);
    });

    function MyNewObject() {
        this.valueNumeric = 1.00;
    }
    it('Valdi.inspect on new object and its property', function () {
        expect(Valdi.inspect.getType(new MyNewObject())).toBe('object');
        expect(Valdi.inspect.getObjectName(new MyNewObject())).toBe('MyNewObject');
        expect(Valdi.inspect.name(new MyNewObject())).toBe('MyNewObject');
        expect(Valdi.inspect.getType((new MyNewObject()).valueNumeric)).toBe('number');
    });

});

describe('Valdi exposes valdi.string as toolkit object for manipulating strings', function () {
    it('Valdi.string', function () {
        expect(typeof Valdi.string).toBe('object');
        expect(Valdi.inspect.getObjectName(Valdi.string)).toBe('StringTool');
        expect(Valdi.string.version()).toBe(_ver);
    });
});

describe('Valdi exposes valdi.validator as toolkit for validation', function () {
    it('Valdi.validator', function () {
        expect(typeof Valdi.validator).toBe('object');
        expect(Valdi.inspect.getObjectName(Valdi.validator)).toBe('InputValidator');
        expect(Valdi.validator.version()).toBe(_ver);
    });
});

describe('Valdi exposes valdi.expression with factory method', function () {
    it('Valdi.expression', function () {
        expect(Valdi.inspect.name(Valdi.expression.factory())).toBe('ValidatorExpression');
    });
});


var Valdi = require('./../../index'),
    ValidatorExpression = require('./../../src/validator-expression');

var testDetails = require('./_details/validator-expression-details.json');
console.log('MD5: ' + testDetails.md5 + ' File: ' + testDetails.file);

var _config = require('./../../src/config'),
    _ver = _config.version;

describe('ValidatorExpression exposes version number', function () {
    it('Version 0.0.1', function () {
        expect(ValidatorExpression.version()).toBe(_ver);
    });
});

var expressionOne   = ValidatorExpression.factory(),
    expressionTwo   = ValidatorExpression.factory(),
    expressionThree = ValidatorExpression.factory(),
    expressionFour  = ValidatorExpression.factory(),
    expressionFive  = ValidatorExpression.factory(),
    expressionSix   = ValidatorExpression.factory();

describe('ValidatorExpression creates children with factory method', function () {
    it('They all share parent ID', function () {
        expect(ValidatorExpression._id).toBe(expressionOne._parent_id);
        expect(ValidatorExpression._id).toBe(expressionTwo._parent_id);
        expect(ValidatorExpression._id).toBe(expressionThree._parent_id);
        expect(ValidatorExpression._id).toBe(expressionFour._parent_id);
        expect(expressionOne._parent_id).toBe(expressionTwo._parent_id);
    });
    it('Parent ID and individual ID are MD5', function () {
        expect(ValidatorExpression._parent_id).toBe(''); // no parent
        expect(ValidatorExpression._id.length).toBe(32);
        expect(expressionOne._id.length).toBe(32);
        expect(expressionTwo._id.length).toBe(32);
        expect(expressionThree._id.length).toBe(32);
        expect(expressionFour._id.length).toBe(32);
        expect(expressionOne._parent_id.length).toBe(32);
        expect(expressionTwo._parent_id.length).toBe(32);
        expect(expressionThree._parent_id.length).toBe(32);
        expect(expressionFour._parent_id.length).toBe(32);
    });
});

expressionOne.setOperator('AND').add('Assertion #1', true).add('Assertion #1', true).evaluate();
expressionTwo.setOperator('OR').add('Assertion #3', true).add('Assertion #4', false).add('Assertion #5', false).evaluate();
expressionThree.setOperator('AND').add('Assertion #6', true).add('Assertion #7', false).evaluate();
expressionFour.setOperator('OR').add('Assertion #8', false).add('Assertion #9', false).add('Assertion #10', false).evaluate();

expressionFive.setOperator('AND').add('Expression #1', expressionOne).add('Assertion #11', true);
expressionSix.setOperator('OR').add('Expression #4', expressionFour).add('Assertion #12', true);

describe('ValidatorExpression can cascade expressions', function () {
    it('AND with both TRUE', function () {
        expect(expressionFive.result()).toBe(true);
    });
    it('OR with FALSE|FALSE', function () {
        expect(expressionSix.result()).toBe(true);
    });
});

var expressionSeven = ValidatorExpression.factory({
    _id: 'nested-assertion',
    operator: 'AND',
    expressions: {
        'Assertion #100': true,
        'Assertion #101': true,
        'Expression #200': ValidatorExpression.factory().setOperator('OR').add('One', false).add('Two', true)
    }
});

describe('ValidatorExpression can cascade expressions from object', function () {
    it('AND with all three as TRUE', function () {
        expect(expressionSeven.result()).toBe(true);
    });
});

var expressionError = ValidatorExpression.factory();

describe('When passed with incorrect params an error is logged', function () {
    it('for operator bad string', function () {
        expect(expressionError.setOperator('BOO').errors[0]).toBe(expressionError.err_codes.operatorDoesNotExist);
    });
    it('for operator non string', function () {
        expect(expressionError.setOperator(false).errors[1]).toBe(expressionError.err_codes.operatorMustBeString);
    });
    it('for assertion non bool or object', function () {
        expect(expressionError.add('Assertion #1', { bad: 'input' }).errors[2]).toBe(expressionError.err_codes.invalidExpression);
    });
    it('for evaluate on unset operator', function () {
        expect(expressionError.evaluate().errors[3]).toBe(expressionError.err_codes.operatorNotSet);
    });
});

var ww1 = Valdi.simple.new('WW1').integer().greaterThan(1913).lessThan(1919),
    ww2 = Valdi.simple.new('WW2').integer().greaterThan(1938).lessThan(1946);

describe('Validate multiple ranges', function () {
    it('Year 1917', function () {
        expect(
            Valdi.expression.factory().setOperator('OR').add(
                'WW1', ww1.value(1917)
            ).add(
                'WW2', ww2.value(1917)
            ).result()
        ).toBe(true); // a WW1 year
    });
    it('Year 1944', function () {
        expect(
            Valdi.expression.factory().setOperator('OR').add(
                'WW1', ww1.value(1944)
            ).add(
                'WW2', ww2.value(1944)
            ).result()
        ).toBe(true); // a WW2 year
    });
    it('Year 1984', function () {
        expect(
            Valdi.expression.factory().setOperator('OR').add(
                'WW1', ww1.value(1984)
            ).add(
                'WW2', ww2.value(1984)
            ).result()
        ).toBe(false); // not a war year
    });
});

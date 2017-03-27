var path = require('path'),
    fs = require('fs'),
    md5 = require('md5'),
    Config = require('./../../src/config'),
    Valdi = require('./../../index');

console.log('MD5: ' + md5(fs.readFileSync(__filename)) + ' File: ' + path.basename(__filename));

describe('Valdi probvides access to Shorthand objects', function () {
    it('via full name', function () {
        expect(Valdi.inspect.name(Valdi.shorthand)).toBe('Shorthand');
        expect(Valdi.shorthand.version()).toBe(Config.version);
    });
    it('via short name', function () {
        expect(Valdi.inspect.name(Valdi.sh)).toBe('Shorthand');
        expect(Valdi.sh.version()).toBe(Config.version);
    });
    it('via short name', function () {
        expect(Valdi.inspect.name(Valdi.simple)).toBe('Shorthand');
        expect(Valdi.simple.version()).toBe(Config.version);
    });
});

var instance2 = Valdi.simple.new('Simon'),
    instance3 = Valdi.simple.new('The Cat');

describe('factory can describe objects', function () {
    it('new instance has alias', function () {
        expect(instance2.desc).toBe('Simon');
        expect(instance3.desc).toBe('The Cat');
    });
    it('new instance has alias', function () {
        expect(instance2.parent).toBe(1);
        expect(instance3.parent).toBe(1);
        expect(instance2.id).toBe(2);
        expect(instance3.id).toBe(3);
    });
});

var input = {
    email: Valdi.simple.new('Email. String and email address').string().email(),
    year: Valdi.simple.new('20th Century year. Integer and between 1899 and 2000').integer().lessThan(2000).greaterThan(1899)
};

describe('Shorthand implements simple validators config w. fluent interface', function () {
    it('Configure multiple at once without value passed yet', function () {
        expect(input.email.desc).toBe('Email. String and email address');
        expect(input.year.desc).toBe('20th Century year. Integer and between 1899 and 2000');
        expect(input.email._value).toBe(null);
        expect(input.year._value).toBe(null);
    });
    it('Validate multiple just passing values', function () {
        expect(input.email.value('valid@email.com')).toBe(true);
        expect(input.email.value('bzzz')).toBe(false);
        expect(input.year.value('not a year')).toBe(false);
        expect(input.year.value(parseInt(1918))).toBe(true);
    });
});

// all the validators together now

var simple = Valdi.simple;

describe('Basic checks again via simple', function () {
    it('Methods chain simple.number().value()', function () {
        expect(simple.new('A number').number().value(false)).toBe(false);
        expect(simple.new('A number').number().value('ABC')).toBe(false);
        expect(simple.new('A number').number().value('')).toBe(false);
        expect(simple.new('A number').number().value({ obj: true })).toBe(false);
        expect(simple.new('A number').number().value(1234)).toBe(true);
        expect(simple.new('A number').number().value(10.11)).toBe(true);
    });
    
    it('Methods chain simple.numberAsString().value()', function () {
        expect(simple.new('A number as string').numberAsString().value(false)).toBe(false);
        expect(simple.new('A number as string').numberAsString().value('67.14')).toBe(true);
        expect(simple.new('A number as string').numberAsString().value('334567')).toBe(true);
    });

    it('Methods chain simple.integer().value()', function () {
        expect(simple.new('An integer').integer().value(false)).toBe(false);
        expect(simple.new('An integer').integer().value(14.56)).toBe(false);
        expect(simple.new('An integer').integer().value(1234)).toBe(true);
    });

    it('Methods chain simple.integer() .min() .max()', function () {
        expect(simple.new('An integer with min').integer().min(23).value(false)).toBe(false);
        expect(simple.new('An integer with min').integer().min(23).value(100)).toBe(true);
        expect(simple.new('An integer with min').integer().min(123).value(100)).toBe(false);
        expect(simple.new('An integer with max').integer().max(23).value(false)).toBe(false);
        expect(simple.new('An integer with max').integer().max(23).value(22)).toBe(true);
        expect(simple.new('An integer with max').integer().max(23).value(55)).toBe(false);
        expect(simple.new('An integer with max & max').integer().min(5).max(15).value(false)).toBe(false);
        expect(simple.new('An integer with max & max').integer().min(5).max(15).value(14)).toBe(true);
        expect(simple.new('An integer with max & max').integer().min(5).max(15).value(-1)).toBe(false);
        expect(simple.new('An integer with max & max').integer().min(5).max(15).value(16)).toBe(false);
    });

    it('Methods chain ...integerAsString()', function () {
        expect(simple.new('An integer as string').integerAsString().value(false)).toBe(false);
        expect(simple.new('An integer as string').integerAsString().value('2345')).toBe(true);
    });

    it('Methods chain ...real()', function () {
        expect(simple.new('A real number').real().value(false)).toBe(false);
        expect(simple.new('A real number').real().value(2.15)).toBe(true);
        expect(simple.new('A real number').real().value('2.56')).toBe(false);
    });

    it('Methods chain ...realAsString()', function () {
        expect(simple.new('A real number as string').realAsString().value(false)).toBe(false);
        expect(simple.new('A real number as string').realAsString().value('3.14')).toBe(true);
    });

    it('Methods chain ...bool()', function () {
        expect(simple.new('A bool').bool().value(false)).toBe(true);
        expect(simple.new('A bool').bool().value(true)).toBe(true);
        expect(simple.new('A bool').bool().value(null)).toBe(false);
        expect(simple.new('A bool').bool().value({ obj: true })).toBe(false);
    });

    it('Methods chain ..null()', function () {
        expect(simple.new('A null').null().value(null)).toBe(true);
        expect(simple.new('A null').null().value(false)).toBe(false);
        expect(simple.new('A null').null().value({ obj: true})).toBe(false);
    });

    it('Methods chain ..validLocale()', function () {
        expect(simple.new('A valid locale').validLocale().value(false)).toBe(false);
        expect(simple.new('A valid locale').validLocale().value('en')).toBe(true);
        expect(simple.new('A valid locale').validLocale().value('ar')).toBe(true);
        expect(simple.new('A valid locale').validLocale().value('ja')).toBe(true);
        expect(simple.new('A valid locale').validLocale().value('de')).toBe(true);
        expect(simple.new('A valid locale').validLocale().value('invalid')).toBe(false);
    });

    it('Methods chain ..string()', function () {
        expect(simple.new('A string value').string().value('false')).toBe(true);
        expect(simple.new('A string value').string().value({ obj: true })).toBe(false);
        expect(simple.new('A string value').string().value(112.33)).toBe(false);
        expect(simple.new('A string value').string().value('Valid string')).toBe(true);
    });

    it('Methods chain ...email()', function () {
        expect(simple.new('An email').string().value('martin.swiderski@gmail.com')).toBe(true);
        expect(simple.new('An email').string().value('spooks@8ig.uk')).toBe(true);
        expect(simple.new('An email').string().value(false)).toBe(false);
    });

    it('Methods chain ...emptyString()', function () {
        expect(simple.new('An empty string').emptyString().value('martin.swiderski@gmail.com')).toBe(false);
        expect(simple.new('An empty string').emptyString().value('')).toBe(true);
        expect(simple.new('An empty string').emptyString().value(false)).toBe(false);
    });

    it('Methods chain ...number().greaterThan()', function () {
        expect(simple.new('A number greater than').number().greaterThan(100).value(false)).toBe(false);
        expect(simple.new('A number greater than').number().greaterThan(100).value(101)).toBe(true);
        expect(simple.new('A number greater than').number().greaterThan(2).value(1)).toBe(false);
        expect(simple.new('A number greater than').number().greaterThan(25).value(32)).toBe(true);
        expect(simple.new('A number greater than').number().greaterThan(25).value(32)).toBe(true);
        expect(simple.new('A number greater than').integer(true).greaterThan(25).value('32')).toBe(true);
        expect(simple.new('A number greater than').real(true).greaterThan(1.3).value(2.1)).toBe(true);
        expect(simple.new('A number greater than').real(true).greaterThan(15.1).value(30.1)).toBe(true);
        expect(simple.new('A number greater than').real(true).greaterThan('1.3').value('2.1')).toBe(true);
        expect(simple.new('A number greater than').real(true).greaterThan('15.1').value('30.1')).toBe(true);
    });
    it('Methods chain ....number().lessThan()', function () {
        expect(simple.new('A number less than').number().lessThan(100).value(false)).toBe(false);
        expect(simple.new('A number less than').number().lessThan(100).value(78)).toBe(true);
        expect(simple.new('A number less than').number().lessThan('748').value(200)).toBe(true);
        expect(simple.new('A number less than').number().lessThan(55).value(3)).toBe(true);
        expect(simple.new('A number less than').number().lessThan(11).value(71)).toBe(false);
        expect(simple.new('A number less than').number(true).lessThan('11').value('7')).toBe(true);
        expect(simple.new('A number less than').integer(true).lessThan('11').value('71')).toBe(false);
        //expect(simple.new('A number less than').real(true).lessThan('10.56').value('10.1')).toBe(false);
    });

    it('Methods chain ...equal()', function () {
        expect(simple.new('A number equal').number().equal(100).value(100)).toBe(true);
        expect(simple.new('A number equal').number().equal(100).value(100.00)).toBe(true);
        expect(simple.new('A string equal').string().equal('ABC').value('ABC')).toBe(true);
    });

    it('Methods chain ...notEqual()', function () {
        expect(simple.new('A number not equal').number().notEqual(123).value(100)).toBe(true);
        expect(simple.new('A number not equal').number().notEqual(99).value(100.00)).toBe(true);
        expect(simple.new('A string not equal').string().notEqual('AXC').value('ABC')).toBe(true);
    });

    it('Methods chain ..arrayAsString()', function () {
        expect(simple.new('Array as string')
            .string().arrayAsString().value('["8.8.8.8","2001:4860:4860::8888","2001:4860:4860::8844"]')).toBe(true);
        expect(simple.new('Array as string')
            .string().arrayAsString().value('"8.8.8.8","2001:4860:4860::8888","2001:4860:4860::8844"')).toBe(true);
        expect(simple.new('Array as string')
            .string().arrayAsString().value('8.8.8.8,2001:4860:4860::8888,2001:4860:4860::8844')).toBe(true);
        expect(simple.new('Array as string')
            .string().arrayAsString().value('8.8.8.8,2001:4860:4860::8888,2001:4860:4860::8844')).toBe(true);
        expect(simple.new('Array as string')
            .string().arrayAsString().value(false)).toBe(false);
        expect(simple.new('Array as string')
            .string().arrayAsString().value([1, 2,3])).toBe(false);
    });
});

describe('Implements lists matches', function () {
    it('Whitelist inList()', function () {
        expect(
            simple.new(
                'List as CSV string with doublequote as delimiter'
            ).string().inList(
                '"8.8.8.8","2001:4860:4860::8888","2001:4860:4860::8844"'
            ).value('2001:4860:4860::8844')
        ).toBe(true);
        expect(
            simple.new(
                'List as CSV string with no delimiter'
            ).string().inList(
                '8.8.8.8,2001:4860:4860::8888,2001:4860:4860::8844'
            ).value('2001:4860:4860::8844')
        ).toBe(true);
        expect(
            simple.new(
                'List as Array in JSON string'
            ).string().inList(
                '["8.8.8.8","2001:4860:4860::8888","2001:4860:4860::8844"]'
            ).value('2001:4860:4860::8844')
        ).toBe(true);
        expect(
            simple.new(
                'List as native Array'
            ).string().inList([
                '8.8.8.8', 
                '2001:4860:4860::8888', 
                '2001:4860:4860::8844'
            ]).value('2001:4860:4860::8844')
        ).toBe(true);
        expect(
            simple.new(
                'List as native Array'
            ).string().inList([
                '8.8.8.8', 
                '2001:4860:4860::8888', 
                '2001:4860:4860::8844'
            ]).value('ABC')
        ).toBe(false);
    });
    it('Whitelist inList()', function () {
        expect(
            simple.new(
                'List as Array' 
            ).string().notInList([
                'Rebel',
                'Conman',
                'Cheat',
                'Fraud'
            ]).value('Jedi')
        ).toBe(true);
        expect(
            simple.new(
                'List as JSON string' 
            ).string().notInList(
                '["Rebel","Conman","Cheat","Fraud"]'
            ).value('Jedi')
        ).toBe(true);
        expect(
            simple.new(
                'List as CSV string with doublequote as delimiter' 
            ).string().notInList(
                '"Rebel","Conman","Cheat","Fraud"'
            ).value('Jedi')
        ).toBe(true);
        expect(
            simple.new(
                'List as CSV string no delimiter' 
            ).string().notInList(
                'Rebel,Conman,Cheat,Fraud'
            ).value('Jedi')
        ).toBe(true);
        expect(
            simple.new(
                'List as CSV string no delimiter' 
            ).string().notInList(
                'Rebel,Conman,Cheat,Fraud'
            ).value('Conman')
        ).toBe(false);
    });
});

var testdata = {
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

describe('Additional validators', function () {
    it('URL', function () {
        expect(simple.new('Valid URL').string().url().value('http://cecpvmlx080.internal.boo.net:8055/')).toBe(true);
        expect(simple.new('Invalid URL').string().url().value('GaHssDGHDGghwsgyw')).toBe(false);
    });
    it('base64', function () {
        expect(simple.new('Valid Base64').string().base64().value('aGVyZSB3ZSBjb21lIGFnYWlu')).toBe(true);
        expect(simple.new('Invalid Base64').string().base64().value('GaHssDGHDGghwsgyw')).toBe(false);
    });
    it('ipv4', function () {
        expect(simple.new('Valid IPv4').string().ipv4().value('10.10.1.1')).toBe(true);
        expect(simple.new('Invalid IPv4').string().ipv4().value('GaHssDGHDGghwsgyw')).toBe(false);
    });
    it('ipv5', function () {
        expect(simple.new('Valid IPv6').string().ipv6().value('2001:4860:4860::8888')).toBe(true);
        expect(simple.new('Invalid IPv6').string().ipv6().value('GaHssDGHDGghwsgyw')).toBe(false);
    });
    it('alphanumeric', function () {
        expect(simple.new('Valid Alphanum').string().alphanumeric('xx').value('2001:4860:4860::8888')).toBe(false);
        expect(simple.new('Valid Alphanum').string().alphanumeric('en').value(testdata.English.christopherMarlowe)).toBe(true);
        expect(simple.new('Valid Alphanum').string().alphanumeric('de').value(testdata.German.gebhardVonBluecher)).toBe(true);
        expect(simple.new('Valid Alphanum').string().alphanumeric('fr').value(testdata.French.deSaintExupery)).toBe(true);
        expect(simple.new('Valid Alphanum').string().alphanumeric('ja').value(testdata.Japanese.miyamotoMusashi)).toBe(true);
        expect(simple.new('Valid Alphanum').string().alphanumeric('ar').value(testdata.Arabic.salahAdDin)).toBe(true);
    });
    it('regexMatch', function () {
        expect(simple.new('Valid Regex').string().regexMatch(/^\w+$/).value('0123456789')).toBe(true);
        expect(simple.new('Invalid Regex').string().regexMatch(/^\w+$/).value('0123456789 (bad)')).toBe(false);
    });
    it('jsonString', function () {
        expect(simple.new('Valid JSON').string().jsonString().value(JSON.stringify({this: 'is JSON'}))).toBe(true);
        expect(simple.new('Invalid JSON').string().jsonString().value('GaHssDGHDGghwsgyw')).toBe(false);
    });
});

var ob = {};

describe('Operators are case insensitive', function () {

    ob['and'] = {
        'AND': simple.new().operator('AND'),
            'and': simple.new().operator('and'),
            'aNd': simple.new().operator('aNd'),
            'AnD': simple.new().operator('AnD')
    };
    ob['or'] = {
        'OR': simple.new().operator('OR'),
            'or': simple.new().operator('or'),
            'oR': simple.new().operator('oR'),
            'Or': simple.new().operator('Or')
    };
    ob.or['orShort'] = simple.new().or();
    ob.and['andShort'] = simple.new().and();

it('AND', function () {
        expect(ob.and['AND']._operator).toBe('and');
        expect(ob.and['and']._operator).toBe('and');
        expect(ob.and['AnD']._operator).toBe('and');
        expect(ob.and['aNd']._operator).toBe('and');
    });
    it('OR', function () {
        expect(ob.or['OR']._operator).toBe('or');
        expect(ob.or['or']._operator).toBe('or');
        expect(ob.or['Or']._operator).toBe('or');
        expect(ob.or['oR']._operator).toBe('or');
    });
    it('OR/AND have wrapper method', function () {
        expect(ob.and['andShort']._operator).toBe('and');
        expect(ob.or['orShort']._operator).toBe('or');
    });
});

var EmailOrEnum = simple.new().or().string().inList('N/A,,none,dunno').email(),
    Wartime     = simple.new().or().inList('1914,1915,1916,1917,1918').inList('1939,1940,1941,1942,1943,1944,1945');

describe('Examples OR', function () {
    it('OR', function () {
        expect(EmailOrEnum.value('N/A')).toBe(true);
        expect(EmailOrEnum.value('')).toBe(true);
        expect(EmailOrEnum.value('none')).toBe(true);
        expect(EmailOrEnum.value('dunno')).toBe(true);
        expect(EmailOrEnum.value('valid@email.com')).toBe(true);
    });
    it('Wartime', function () {
        expect(Wartime.value(1905)).toBe(false);
        expect(Wartime.value(1943)).toBe(true);
        expect(Wartime.value(1984)).toBe(false);
    });
});


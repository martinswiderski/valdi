valdi
---
Input validation with extendable valid patterns definitions - for ES6 version check [valdi-es6](https://github.com/martinswiderski/valdi-es6).

### Current version
ver. **0.0.372**

[![Build Status](https://travis-ci.org/martinswiderski/valdi.svg?branch=master)](https://travis-ci.org/martinswiderski/valdi) [![npm version](https://badge.fury.io/js/valdi.svg)](https://www.npmjs.com/package/valdi)

In order to install please run in your project path:

```bash
npm install --save valdi
```

#### Simple assertions (multiple conditions with AND)

```javascript
var Valdi = require('valdi');

var ww1 = Valdi.simple.new('WW1').integer().greaterThan(1913).lessThan(1919);

console.log(ww1.value(1918));
console.log(ww1.value(2000));
console.log(ww1.value(1900));
```
shows following output:

```bash
true
false
false
```

#### More complex assertions (multiple conditions with OR/AND)

```javascript
var Valdi = require('valdi');

var ww1 = Valdi.simple.new('WW1').integer().greaterThan(1913).lessThan(1919),
    ww2 = Valdi.simple.new('WW2').integer().greaterThan(1938).lessThan(1946);

console.log(
    Valdi.expression.factory().setOperator('OR')
        .add('WW1', ww1.value(1944))
        .add('WW2', ww2.value(1944))
        .result()
);
console.log(
    Valdi.expression.factory().setOperator('OR')
        .add('WW1', ww1.value(1984))
        .add('WW2', ww2.value(1984))
        .result()
);
```
shows following output:

```bash
true
false
```
#### Using whitelists and blacklists

The example above can be asserted with a simple whitelist scenario that makes the code much neater (@spooky-monkey):

```javascript
// include module in your project
var Valdi = require('./index');
```

##### Whitelist provided in native Array

```javascript
// include module in your project
var warYear = Valdi.simple.new('WW1 & WW2 years via native Array')
        .integer().inList([1914, 
                           1915, 
                           1916, 
                           1917, 
                           1918, 
                           1939, 
                           1940, 
                           1941, 
                           1942, 
                           1943, 
                           1944, 
                           1945]);

console.log(warYear.desc);
console.log(warYear.value(1944));
console.log(warYear.value(1984));

// true
// false
```

##### Whitelist provided in JSON string

```javascript
// include module in your project
var warYearJson = Valdi.simple.new('WW1 & WW2 years with whitelist in JSON')
        .integer().inList('[1914, 1915, 1916, 1917, 1918, 1939, 1940, 1941, 1942, 1943, 1944, 1945]');

console.log(warYearJson.desc);
console.log(warYearJson.value(1944));
console.log(warYearJson.value(1984));

// true
// false
```

##### Whitelist provided in simple CSV string

```javascript
// include module in your project
var warYearCsv = Valdi.simple.new('WW1 & WW2 years with whitelist in CSV')
        .integer().inList('1914,1915,1916,1917,1918,1939,1940,1941,1942,1943,1944,1945');

console.log(warYearCsv.desc);
console.log(warYearCsv.value(1944));
console.log(warYearCsv.value(1984));

// true
// false
```

##### Whitelist provided in CSV string with double-quote delimiter

```javascript
// include module in your project
var warYearCsv2 = Valdi.simple.new(
    'WW1 & WW2 years with whitelist in CSV w. doublequote delimiters'
    ).integer().inList(
        '"1914","1915","1916","1917","1918","1939","1940","1941","1942","1943","1944","1945"'
    );

console.log(warYearCsv2.desc);
console.log(warYearCsv2.value(1944));
console.log(warYearCsv2.value(1984));
```

#### Simple assertions (AND only)


```javascript
var Valdi = require('./index'),
    simple = Valdi.simple, // simple validators all rules in conjunction (AND)
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
```

```javascript
console.log( '----  Methods chain simple.number().value() ----' );

console.log( simple.new('A number').number().value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A number').number().value('ABC') );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A number').number().value('') );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A number').number().value({ obj: true }) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A number').number().value(1234) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A number').number().value(10.11) );
console.log( 'expected: true' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain simple.numberAsString().value() ----' );

console.log( simple.new('A number as string').numberAsString().value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A number as string').numberAsString().value('67.14') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A number as string').numberAsString().value('334567') );
console.log( 'expected: true' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain simple.integer().value() ----' );

console.log( simple.new('An integer').integer().value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('An integer').integer().value(14.56) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('An integer').integer().value(1234) );
console.log( 'expected: true' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain simple.integer() .min() .max() ----' );

console.log( simple.new('An integer with min').integer().min(23).value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('An integer with min').integer().min(23).value(100) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('An integer with min').integer().min(123).value(100) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('An integer with max').integer().max(23).value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('An integer with max').integer().max(23).value(22) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('An integer with max').integer().max(23).value(55) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('An integer with max & max').integer().min(5).max(15).value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('An integer with max & max').integer().min(5).max(15).value(14) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('An integer with max & max').integer().min(5).max(15).value(-1) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('An integer with max & max').integer().min(5).max(15).value(16) );
console.log( 'expected: false' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain ...integerAsString() ----' );

console.log( simple.new('An integer as string').integerAsString().value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('An integer as string').integerAsString().value('2345') );
console.log( 'expected: true' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain ...real() ----' );

console.log( simple.new('A real number').real().value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A real number').real().value(2.15) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A real number').real().value('2.56') );
console.log( 'expected: false' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain ...realAsString() ----' );

console.log( simple.new('A real number as string').realAsString().value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A real number as string').realAsString().value('3.14') );
console.log( 'expected: true' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain ...bool() ----' );

console.log( simple.new('A bool').bool().value(false) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A bool').bool().value(true) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A bool').bool().value(null) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A bool').bool().value({ obj: true }) );
console.log( 'expected: false' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain ..null() ----' );

console.log( simple.new('A null').null().value(null) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A null').null().value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A null').null().value({ obj: true}) );
console.log( 'expected: false' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain ..validLocale() ----' );

console.log( simple.new('A valid locale').validLocale().value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A valid locale').validLocale().value('en') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A valid locale').validLocale().value('ar') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A valid locale').validLocale().value('ja') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A valid locale').validLocale().value('de') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A valid locale').validLocale().value('invalid') );
console.log( 'expected: false' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain ..string() ----' );

console.log( simple.new('A string value').string().value('false') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A string value').string().value({ obj: true }) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A string value').string().value(112.33) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A string value').string().value('Valid string') );
console.log( 'expected: true' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain ...email() ----' );

console.log( simple.new('An email').string().value('martin.swiderski@gmail.com') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('An email').string().value('spooks@8ig.uk') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('An email').string().value(false) );
console.log( 'expected: false' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain ...emptyString() ----' );

console.log( simple.new('An empty string').emptyString().value('martin.swiderski@gmail.com') );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('An empty string').emptyString().value('') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('An empty string').emptyString().value(false) );
console.log( 'expected: false' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain ...number().greaterThan() ----' );

console.log( simple.new('A number greater than').number().greaterThan(100).value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A number greater than').number().greaterThan(100).value(101) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A number greater than').number().greaterThan(2).value(1) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A number greater than').number().greaterThan(25).value(32) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A number greater than').number().greaterThan(25).value(32) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A number greater than').integer(true).greaterThan(25).value('32') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A number greater than').real(true).greaterThan(1.3).value(2.1) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A number greater than').real(true).greaterThan(15.1).value(30.1) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A number greater than').real(true).greaterThan('1.3').value('2.1') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A number greater than').real(true).greaterThan('15.1').value('30.1') );
console.log( 'expected: true' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain ....number().lessThan() ----' );

console.log( simple.new('A number less than').number().lessThan(100).value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A number less than').number().lessThan(100).value(78) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A number less than').number().lessThan('748').value(200) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A number less than').number().lessThan(55).value(3) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A number less than').number().lessThan(11).value(71) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A number less than').number(true).lessThan('11').value('7') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A number less than').integer(true).lessThan('11').value('71') );
console.log( 'expected: false' ); 
console.log( '' );
//expect(simple.new('A number less than').real(true).lessThan('10.56').value('10.1') );
console.log( 'expected: false' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain ...equal() ----' );

console.log( simple.new('A number equal').number().equal(100).value(100) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A number equal').number().equal(100).value(100.00) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A string equal').string().equal('ABC').value('ABC') );
console.log( 'expected: true' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain ...notEqual() ----' );

console.log( simple.new('A number not equal').number().notEqual(123).value(100) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A number not equal').number().notEqual(99).value(100.00) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('A string not equal').string().notEqual('AXC').value('ABC') );
console.log( 'expected: true' ); 
console.log( '' );
```


```javascript
console.log( '----  Methods chain ..arrayAsString() ----' );

console.log( simple.new('Array as string').string().arrayAsString().value('["8.8.8.8","2001:4860:4860::8888","2001:4860:4860::8844"]') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Array as string').string().arrayAsString().value('"8.8.8.8","2001:4860:4860::8888","2001:4860:4860::8844"') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Array as string').string().arrayAsString().value('8.8.8.8,2001:4860:4860::8888,2001:4860:4860::8844') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Array as string').string().arrayAsString().value('8.8.8.8,2001:4860:4860::8888,2001:4860:4860::8844') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Array as string').string().arrayAsString().value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('Array as string').string().arrayAsString().value([1, 2,3]) );
console.log( 'expected: false' ); 
console.log( '' );
```


```javascript
console.log( '----  URL ----' );

console.log( simple.new('Valid URL').string().url().value('http://cecpvmlx080.internal.scee.net:8055/') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Invalid URL').string().url().value('GaHssDGHDGghwsgyw') );
console.log( 'expected: false' ); 
console.log( '' );
```


```javascript
console.log( '----  base64 ----' );

console.log( simple.new('Valid Base64').string().base64().value('aGVyZSB3ZSBjb21lIGFnYWlu') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Invalid Base64').string().base64().value('GaHssDGHDGghwsgyw') );
console.log( 'expected: false' ); 
console.log( '' );
```


```javascript
console.log( '----  ipv4 ----' );

console.log( simple.new('Valid IPv4').string().ipv4().value('10.10.1.1') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Invalid IPv4').string().ipv4().value('GaHssDGHDGghwsgyw') );
console.log( 'expected: false' ); 
console.log( '' );
```


```javascript
console.log( '----  ipv5 ----' );

console.log( simple.new('Valid IPv6').string().ipv6().value('2001:4860:4860::8888') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Invalid IPv6').string().ipv6().value('GaHssDGHDGghwsgyw') );
console.log( 'expected: false' ); 
console.log( '' );
```


```javascript
console.log( '----  alphanumeric ----' );

console.log( simple.new('Valid Alphanum').string().alphanumeric('xx').value('2001:4860:4860::8888') );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('Valid Alphanum').string().alphanumeric('en').value(testdata.English.christopherMarlowe) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Valid Alphanum').string().alphanumeric('de').value(testdata.German.gebhardVonBluecher) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Valid Alphanum').string().alphanumeric('fr').value(testdata.French.deSaintExupery) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Valid Alphanum').string().alphanumeric('ja').value(testdata.Japanese.miyamotoMusashi) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Valid Alphanum').string().alphanumeric('ar').value(testdata.Arabic.salahAdDin) );
console.log( 'expected: true' ); 
console.log( '' );
```


```javascript
console.log( '----  regexMatch ----' );

console.log( simple.new('Valid Regex').string().regexMatch(/^\w+$/).value('0123456789') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Invalid Regex').string().regexMatch(/^\w+$/).value('0123456789 (trigger regex false)') );
console.log( 'expected: false' ); 
console.log( '' );
```


```javascript
console.log( '----  jsonString ----' );

console.log( simple.new('Valid JSON').string().jsonString().value(JSON.stringify({this: 'is JSON'})) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Invalid JSON').string().jsonString().value('GaHssDGHDGghwsgyw') );
console.log( 'expected: false' ); 
console.log( '' );
```


valdi
---
<p align="left">
  <img src="https://raw.githubusercontent.com/martinswiderski/valdi/master/valdi-logo-small.png" alt="valdi"/>
</p>

Input validation with configured, custom 'valid' patterns definitions - for ES6 version check [valdi-es6](https://github.com/martinswiderski/valdi-es6).

### Current version

Version|Published|By
--- | --- | ---
**0.0.374** | **2017-03-27** | `codebloke`


[![MIT License](https://raw.githubusercontent.com/martinswiderski/valdi/master/mit-license.png)](LICENSE) [![Build Status](https://travis-ci.org/martinswiderski/valdi.svg?branch=master)](https://travis-ci.org/martinswiderski/valdi) [![npm version](https://badge.fury.io/js/valdi.svg)](https://www.npmjs.com/package/valdi)

In order to install please run in your project path:

```bash
npm install --save valdi
```

[![NPM](https://nodei.co/npm/valdi.png)](https://nodei.co/npm/valdi)

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

#### Simpler approach to OR cases

```javascript
var War = Valdi.simple.new()
            .or().inList('1914,1915,1916,1917,1918')
            .inList('1939,1940,1941,1942,1943,1944,1945');

console.log(War.value(1905));
console.log(War.value(1918));
console.log(War.value('ABC'));
console.log(War.value(1944));
console.log(War.value('Make peace not war'));
```
outputs following:

```javascript
false
true
true
false
true
true
false
```
more [about this approach here](#cookbook-26).

### <a name="examples"></a>Other examples

 * [Whitelists and blacklists](#in-list)
 * [Simple assertions](#simple)
 * [simple.number().value()](#cookbook-1)
 * [simple.numberAsString().value()](#cookbook-2)
 * [simple.integer().value()](#cookbook-3)
 * [simple.integer() .min() .max() - using AND](#cookbook-4)
 * [simple.integerAsString()](#cookbook-5)
 * [simple.real()](#cookbook-6)
 * [simple.realAsString()](#cookbook-7)
 * [simple.bool()](#cookbook-8)
 * [simple.null()](#cookbook-9)
 * [simple.validLocale()](#cookbook-10)
 * [simple.string()](#cookbook-11)
 * [simple.email()](#cookbook-12)
 * [simple.emptyString()](#cookbook-13)
 * [simple.number().greaterThan() - using AND](#cookbook-14)
 * [simple.number().lessThan() - using AND](#cookbook-15)
 * [simple.equal()](#cookbook-16)
 * [simple.notEqual()](#cookbook-17)
 * [simple.arrayAsString()](#cookbook-18)
 * [simple.url()](#cookbook-19)
 * [simple.base64()](#cookbook-20)
 * [simple.ipv4()](#cookbook-21)
 * [simple.ipv5()](#cookbook-22)
 * [simple.alphanumeric()](#cookbook-23)
 * [simple.regexMatch()](#cookbook-24)
 * [simple.jsonString()](#cookbook-25)
 * [or() - Using OR](#cookbook-26)


### <a name="in-list"></a>Using whitelists and blacklists

The example above can be asserted with a simple whitelist scenario that makes the code much neater (@spooky-monkey):

```javascript
// include module in your project
var Valdi = require('valdi');
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
[&laquo; back to list](#examples)


### <a name="simple"></a>Simple assertions

**Please note:**
```
Simple is providing only conjuntions (assertions joined by AND only)!
```

##### Including Valdi in your project

```javascript
var Valdi = require('valdi'),
    simple = Valdi.simple;    // simple validators all rules in conjunction (AND)
```
[&laquo; back to list](#examples)

###### <a name="cookbook-1"></a>Methods chain simple.number().value();
```javascript
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
[&laquo; back to list](#examples)

###### <a name="cookbook-2"></a>Methods chain simple.numberAsString().value()

```javascript
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
[&laquo; back to list](#examples)

###### <a name="cookbook-3"></a>Methods chain simple.integer().value()

```javascript
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
[&laquo; back to list](#examples)

###### <a name="cookbook-4"></a>Methods chain simple.integer() .min() .max()

```javascript
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
[&laquo; back to list](#examples)

###### <a name="cookbook-5"></a>Methods chain ...integerAsString()

```javascript
console.log( simple.new('An integer as string').integerAsString().value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('An integer as string').integerAsString().value('2345') );
console.log( 'expected: true' ); 
console.log( '' );
```
[&laquo; back to list](#examples)

###### <a name="cookbook-6"></a>Methods chain ...real()

```javascript
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
[&laquo; back to list](#examples)

###### <a name="cookbook-7"></a>Methods chain ...realAsString()

```javascript
console.log( simple.new('A real number as string').realAsString().value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('A real number as string').realAsString().value('3.14') );
console.log( 'expected: true' ); 
console.log( '' );
```
[&laquo; back to list](#examples)

###### <a name="cookbook-8"></a>Methods chain ...bool()

```javascript
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
[&laquo; back to list](#examples)

###### <a name="cookbook-9"></a>Methods chain ..null()

```javascript
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
[&laquo; back to list](#examples)

###### <a name="cookbook-10"></a>Methods chain ..validLocale()

```javascript
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
[&laquo; back to list](#examples)


###### <a name="cookbook-11"></a>Methods chain ..string()

```javascript
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
[&laquo; back to list](#examples)


###### <a name="cookbook-12"></a>Methods chain ...email()

```javascript
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
[&laquo; back to list](#examples)

###### <a name="cookbook-13"></a>Methods chain ...emptyString()

```javascript
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
[&laquo; back to list](#examples)

###### <a name="cookbook-14"></a>Methods chain ...number().greaterThan()

```javascript
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
[&laquo; back to list](#examples)

###### <a name="cookbook-15"></a>Methods chain ....number().lessThan()

```javascript
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
console.log( simple.new('A number less than').real(true).lessThan('10.56').value('10.1') );
console.log( 'expected: false' ); 
console.log( '' );
```
[&laquo; back to list](#examples)

###### <a name="cookbook-16"></a>Methods chain ...equal()

```javascript
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
[&laquo; back to list](#examples)


###### <a name="cookbook-17"></a>Methods chain ...notEqual()

```javascript
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
[&laquo; back to list](#examples)


###### <a name="cookbook-18"></a>Methods chain ..arrayAsString()

```javascript
console.log( simple.new('Array as string')
                .string().arrayAsString().value('["8.8.8.8","2001:4860:4860::8888","2001:4860:4860::8844"]') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Array as string')
                .string().arrayAsString().value('"8.8.8.8","2001:4860:4860::8888","2001:4860:4860::8844"') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Array as string')
                .string().arrayAsString().value('8.8.8.8,2001:4860:4860::8888,2001:4860:4860::8844') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Array as string')
                .string().arrayAsString().value('8.8.8.8,2001:4860:4860::8888,2001:4860:4860::8844') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Array as string')
                .string().arrayAsString().value(false) );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('Array as string')
                .string().arrayAsString().value([1, 2,3]) );
console.log( 'expected: false' ); 
console.log( '' );
```
[&laquo; back to list](#examples)

###### <a name="cookbook-19"></a>URL

```javascript
console.log( simple.new('Valid URL')
                .string().url().value('http://cecpvmlx080.internal.boo.net:8055/') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Invalid URL')
                .string().url().value('GaHssDGHDGghwsgyw') );
console.log( 'expected: false' ); 
console.log( '' );
```
[&laquo; back to list](#examples)

###### <a name="cookbook-20"></a>base64

```javascript
console.log( simple.new('Valid Base64').string().base64().value('aGVyZSB3ZSBjb21lIGFnYWlu') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Invalid Base64').string().base64().value('GaHssDGHDGghwsgyw') );
console.log( 'expected: false' ); 
console.log( '' );
```
[&laquo; back to list](#examples)

###### <a name="cookbook-21"></a>ipv4

```javascript
console.log( simple.new('Valid IPv4').string().ipv4().value('10.10.1.1') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Invalid IPv4').string().ipv4().value('GaHssDGHDGghwsgyw') );
console.log( 'expected: false' ); 
console.log( '' );
```
[&laquo; back to list](#examples)

###### <a name="cookbook-22"></a>ipv5

```javascript
console.log( simple.new('Valid IPv6').string().ipv6().value('2001:4860:4860::8888') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Invalid IPv6').string().ipv6().value('GaHssDGHDGghwsgyw') );
console.log( 'expected: false' ); 
console.log( '' );
```
[&laquo; back to list](#examples)

###### <a name="cookbook-23"></a>alphanumeric

```javascript
console.log( simple.new('Valid Alphanum')
                .string().alphanumeric('xx').value('2001:4860:4860::8888') );
console.log( 'expected: false' ); 
console.log( '' );
console.log( simple.new('Valid Alphanum')
                .string().alphanumeric('en').value('Christopher Marlowe\'s 0123456789'));
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Valid Alphanum')
                .string().alphanumeric('de')
                .value('Gebhard-Leberecht von Blücher Fürst von Wahlstatt 0123456789') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Valid Alphanum')
                .string().alphanumeric('fr').value('AntoineDeSaint-Exupéry0123456789') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Valid Alphanum')
                .string().alphanumeric('ja').value('宮本武蔵 0123456789') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Valid Alphanum')
                .string().alphanumeric('ar').value('صلاحالدينيوسفبنأيوب0123456789') );
console.log( 'expected: true' ); 
console.log( '' );
```
[&laquo; back to list](#examples)

###### <a name="cookbook-24"></a>regexMatch

```javascript
console.log( simple.new('Valid Regex')
                .string().regexMatch(/^\w+$/).value('0123456789') );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Invalid Regex')
                .string().regexMatch(/^\w+$/).value('0123456789 (trigger regex false)') );
console.log( 'expected: false' ); 
console.log( '' );
```
[&laquo; back to list](#examples)

###### <a name="cookbook-25"></a>jsonString

```javascript
console.log( simple.new('Valid JSON')
                .string().jsonString().value(JSON.stringify({this: 'is JSON'})) );
console.log( 'expected: true' ); 
console.log( '' );
console.log( simple.new('Invalid JSON')
                .string().jsonString().value('GaHssDGHDGghwsgyw') );
console.log( 'expected: false' ); 
console.log( '' );
```
[&laquo; back to list](#examples)

###### <a name="cookbook-26"></a>Using or() - more examples of OR

```javascript
var War = Valdi.simple.new()
            .or().inList('1914,1915,1916,1917,1918')
            .inList('1939,1940,1941,1942,1943,1944,1945');

console.log(War.value(1905));
console.log(War.value(1918));
console.log(War.value('ABC'));
console.log(War.value(1944));
console.log(War.value('Make peace not war'));
```
this would give you:

```javascript
false
true
true
false
true
true
false
```

[&laquo; back to list](#examples)


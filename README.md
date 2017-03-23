valdi
---
Input validation with extendable valid patterns definitions - for ES6 version check [valdi-es6](https://github.com/martinswiderski/valdi-es6).

### Version
ver. **0.0.371**

[![Build Status](https://travis-ci.org/martinswiderski/valdi.svg?branch=master)](https://travis-ci.org/martinswiderski/valdi)

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
var warYearCsv2 = Valdi.simple.new('WW1 & WW2 years with whitelist in CSV w. doublequote delimiters')
        .integer().inList('"1914","1915","1916","1917","1918","1939","1940","1941","1942","1943","1944","1945"');

console.log(warYearCsv2.desc);
console.log(warYearCsv2.value(1944));
console.log(warYearCsv2.value(1984));
```


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



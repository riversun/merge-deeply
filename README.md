# merge-deeply

Deeply merge properties of two JS objects.

# Usage

## Install

```
npm install merge-deeply
```

## Example

### Merge 2-Objects

```js
const mergeDeeply = require('merge-deeply');

const a = {
    foo: 'myValue',
    bar: {
        barKey1: 'myValue1',
        barKey2: 'myValue2'
    },
    myArray: [{arrKey1: 'arrValue1'}, {arrKey2: 'arrValue2'}]

};

const b = {
    foo: 'updatedMyValue',
    bar: {
        barKey1: 'updatedMyValue1',
        barKey2: 'myValue2'
    },
    some: {someKey: 'someValue'},
    myArray: [{arrKey3: 'arrValue3'}, {arrKey4: 'arrValue4'}]

};


const result = mergeDeeply(a, b, {concatArray: true});
console.log('result=');
console.log(result);


```

When you run it you will get the following result.

```js
result=
{ foo: 'updatedMyValue',
  bar: { barKey1: 'updatedMyValue1', barKey2: 'myValue2' },
  myArray: 
   [ { arrKey1: 'arrValue1' },
     { arrKey2: 'arrValue2' },
     { arrKey3: 'arrValue3' },
     { arrKey4: 'arrValue4' } ],
  some: { someKey: 'someValue' } }

```


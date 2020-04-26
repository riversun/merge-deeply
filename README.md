# merge-deeply 

## Allow you to Merge or Clone with prototypes

- You can deep merge (deep copy) the properties of an object

- An object with a prototype declaration can be cloned to include the prototype.

- Objects that have prototype declarations, prototypes and properties that can be deep copied

# Usage

## Install

```
npm install merge-deeply
```

## Usage

### Cloning an object that has a prototype declaration

The following will execute a copy of the method declared as the prototype and a deep copy of all the properties.

```js
const mergeDeeply = require('merge-deeply');

const clonedObject=mergeDeeply({op:'clone',object1:obj1});

```

### Merging 2 objects that has a prototype declaration

The two objects will be merged and a new object will be created, as follows
Of course the prototype is copied.

```js
const mergeDeeply = require('merge-deeply');

const mergedObject=mergeDeeply({op:'merge',object1:obj1,object2:obj2});

```

### Copy(overwrite) properties into object

The following merges obj1 with obj2's properties

```js
const mergeDeeply = require('merge-deeply');

mergeDeeply({op:'overwrite-merge',object1:obj1,object2:obj2});

```

### Merging 2 "Properties only" Objects

If the "concatArray" is true, 
elements of the array are added at merge time

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


const result = mergeDeeply({op:'merge',object1:a,object2:b, concatArray: true});
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


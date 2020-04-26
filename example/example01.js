const mergeDeeply = require('../lib/merge-deeply.js');

const a = {
  foo: 'myValue',
  bar: {
    barKey1: 'myValue1',
    barKey2: 'myValue2'
  },
  myArray: [{ arrKey1: 'arrValue1' }, { arrKey2: 'arrValue2' }]

};

const b = {
  foo: 'updatedMyValue',
  bar: {
    barKey1: 'updatedMyValue1',
    barKey2: 'myValue2'
  },
  some: { someKey: 'someValue' },
  myArray: [{ arrKey3: 'arrValue3' }, { arrKey4: 'arrValue4' }]

};

console.log('target=');
console.log(a);
console.log('\n');
console.log('source=');
console.log(b);
console.log('\n\n');


const result = mergeDeeply({ op: 'merge', object1: a, object2: b, concatArray: true });
console.log('target + source =');
console.log(result);

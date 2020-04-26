const mergeDeeply = require('../lib/merge-deeply.js');

function CTest() {
  this.data1 = {
    foo: 'myValue',
    bar: {
      barKey1: 'myValue1',
      barKey2: 'myValue2'
    },
    myArray: [{ arrKey1: 'arrValue1' }, { arrKey2: 'arrValue2' }]

  };

  this.data2 = 'data2';

  this.multi = function(a, b) {
    return a * b;
  }
}

CTest.prototype.add = function(a, b) {
  return a + b;
};

CTest.prototype.sub = function(a, b) {
  return a - b;
};

var testObject = new CTest();

const clonedObject = mergeDeeply({ op: 'clone', object1: testObject });

console.log('srcObject=');
console.log(testObject);
console.log('srcObject prototypes=');
console.log(Object.getPrototypeOf(testObject));
console.log('\n');

console.log('clonedObject=');
console.log(clonedObject);
console.log('clonedObject prototypes=');
console.log(Object.getPrototypeOf(clonedObject));
console.log('\n\n');

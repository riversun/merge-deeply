import mergeDeeply from '../src/merge-deeply';


describe('MergeDeeply', () => {

  describe('aa()', () => {
    test('normal yyyy/MM/dd HH:mm:ss', () => {
      const a = {
        foo: 'myValue',
        bar: {
          barKey1: 'myValue1',
          barKey2: 'myValue2'
        },
        hoge: 'myHogeValue',
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


      const result = mergeDeeply({ op: 'merge', object1: a, object2: b, concatArray: true });
      expect(result.foo).toBe('updatedMyValue');
      expect(result.bar.barKey1).toBe('updatedMyValue1');
      expect(result.hoge).toBe('myHogeValue');
      expect(result.myArray.length).toBe(4);

    });

    test('Merge class-like-objects with prototypes to create a new object', () => {
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
      var testObject2 = new CTest();
      testObject2.data2 = 'newData';

      const result = mergeDeeply({ op: 'merge', object1: testObject, object2: testObject2, concatArray: true });
      expect(result.data1.bar.barKey1).toBe('myValue1');
      expect(result.data1.myArray.length).toBe(4);
      expect(result.data2).toBe('newData');
      expect(typeof Object.getPrototypeOf(result).add).toBe('function');
      expect(result.add(3, 2)).toBe(5);
      expect(typeof Object.getPrototypeOf(result).sub).toBe('function');
      expect(result.sub(3, 2)).toBe(1);
      expect(result.multi(3, 2)).toBe(6);

      // Change Original objects
      testObject.data1.bar.barKey1 = 'newKey1';
      testObject2.data1.bar.barKey1 = 'newKey2';

      // Make sure the RESULT hasn't changed even though the original has changed
      expect(result.data1.bar.barKey1).toBe('myValue1');

    });

    test('Override testObject2s properties in srcObject', () => {
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
      var testObject2 = new CTest();
      testObject2.data2 = 'newData';

      mergeDeeply({ op: 'overwrite-merge', object1: testObject, object2: testObject2, concatArray: true });
      expect(testObject.data1.bar.barKey1).toBe('myValue1');
      expect(testObject.data1.myArray.length).toBe(4);
      expect(testObject.data2).toBe('newData');
      expect(typeof Object.getPrototypeOf(testObject).add).toBe('function');
      expect(testObject.add(3, 2)).toBe(5);
      expect(typeof Object.getPrototypeOf(testObject).sub).toBe('function');
      expect(testObject.sub(3, 2)).toBe(1);
      expect(testObject.multi(3, 2)).toBe(6);

      // Change Original objects
      testObject2.data1.bar.barKey1 = 'newKey2';
      // Make sure the RESULT hasn't changed even though the copy original has changed
      expect(testObject.data1.bar.barKey1).toBe('myValue1');

      //check exception

      // no op
      expect(function() {
        mergeDeeply({ object1: testObject, object2: testObject2, concatArray: true });
      }).toThrowError('cannot be omitted');

      // invalid op
      expect(function() {
        mergeDeeply({ op: 'overwite-merge', object1: testObject, object2: testObject2, concatArray: true });
      }).toThrowError('invalid');

      // no object
      expect(function() {
        mergeDeeply({ op: 'merge', concatArray: true });
      }).toThrowError('not specified');
      expect(function() {
        mergeDeeply({ op: 'overwrite-merge', concatArray: true });
      }).toThrowError('not specified');

    });

    test('Overwrite domElement properties in srcObject', (done) => {
      const domElement = document.createElement('div');
      domElement.addEventListener('click', (e) => {
        done();
      });
      const obj1 = { domElement: domElement };
      const obj2 = { data1: "data1" };
      mergeDeeply({ op: 'overwrite-merge', object1: obj1, object2: obj2, concatArray: true });
      expect(obj1.data1).toBe('data1');
      obj1.domElement.click();

    });
  });
  test('Empty object', () => {
    const obj1 = { "key": "value" };
    const obj2 = {};
    const result = mergeDeeply({ op: 'overwrite-merge', object1: obj1, object2: obj2 });
    expect(result).toBeNull();

    const obj3 = { "key2": "value2" };
    const result2 = mergeDeeply({ op: 'overwrite-merge', object1: obj1, object2: obj3 });
    expect(result2).not.toBeNull();

  });
  //obj1["key2"]=obj1;
  test('Clone prototypes and properties', () => {
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

    const result = mergeDeeply({ op: 'clone', object1: testObject });
    expect(result.data1.bar.barKey1).toBe('myValue1');
    expect(result.data1.myArray.length).toBe(2);
    expect(result.data2).toBe('data2');
    expect(typeof Object.getPrototypeOf(result).add).toBe('function');
    expect(result.add(3, 2)).toBe(5);
    expect(typeof Object.getPrototypeOf(result).sub).toBe('function');
    expect(result.sub(3, 2)).toBe(1);
    expect(result.multi(3, 2)).toBe(6);

    // Changed original object
    testObject.data1.bar.barKey1 = 'newValue1';
    expect(result.data1.bar.barKey1).toBe('myValue1');


  });
});
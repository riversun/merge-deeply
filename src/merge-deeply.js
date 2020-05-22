import hasOwnPrototype from './has-own-prototype';

function mergeDeeplyInernally(target, source, opts) {
  const isObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj);
  const isConcatArray = opts && opts.concatArray;

  // assignToObject:
  // Overwrites the properties of the specified existing object
  // Specify it when you want to
  // If omitted, a new object for cloning will be created.
  let assignToObject = {};
  if (opts && opts.assignToObject) {
    assignToObject = opts.assignToObject;
    opts.assignToObject = null;
  }


  let result = null;
  if (assignToObject === target) {
    result = target;
  } else {
    result = Object.assign(assignToObject, target);
  }

  if (isObject(target) && isObject(source)) {
    for (const [sourceKey, sourceValue] of Object.entries(source)) {
      const targetValue = target[sourceKey];

      if (isConcatArray && Array.isArray(sourceValue) && Array.isArray(targetValue) && (source !== target)) {
        result[sourceKey] = targetValue.concat(...sourceValue);
      } else if (isObject(sourceValue) && Object.prototype.hasOwnProperty.call(target, sourceKey)) { // NEW
        // OLD: else if (isObject(sourceValue) && target.hasOwnProperty(sourceKey)) {
        result[sourceKey] = mergeDeeplyInernally(targetValue, sourceValue, opts);
      } else {
        Object.assign(result, { [sourceKey]: sourceValue });
      }
    }
  }
  return result;
}


export default function mergeDeeply(opts) {
  let object1 = null;
  let object2 = null;
  const operation = opts.op;
  if (!operation) {
    throw Error('The initialization property "op" cannot be omitted. "merge","overwrite-merge","clone" can be specified.');
  }

  const isMergeMode = operation === 'merge';
  const isCloneMode = operation === 'clone';
  const isOverwriteMode = operation === 'overwrite-merge';

  if (isMergeMode) {
    object1 = opts.object1;
    object2 = opts.object2;

    if (!(object1 && object2)) {
      throw Error('object1 or object2 is not specified.');
    }
  } else if (isOverwriteMode) {
    object1 = opts.object1;
    object2 = opts.object2;

    if (!(object1 && object2)) {
      throw Error('object1 or object2 is not specified.');
    }
    if (Object.keys(object2).length === 0) {
      // try to overwrite empty object(=There's no point in trying.)
      return null;
    }
  } else if (isCloneMode) {
    object1 = opts.object1;
    object2 = {};
  } else {
    throw Error(`An invalid "op" property value "${operation}" has been specified.`);
  }


  // Creates an object with the same prototype declaration as the object specified in the target.
  // In simple terms, this means copying the prototype
  const prototypeClonedObject = Object.create(Object.getPrototypeOf(object1));

  // You can also do the following, but there is no point in doing it because the property will be a shallow copy.
  // const prototypeClonedObject = Object.create(Object.getPrototypeOf(object1),Object.getOwnPropertyDescriptors(object1) );

  let resultObject = null;

  const object1HasCustomPrototype = hasOwnPrototype(object1);
  if ((isMergeMode && object1HasCustomPrototype) || isCloneMode) {
    // copy prototype
    mergeDeeplyInernally(object1, object1,
      {
        assignToObject: prototypeClonedObject,
        concatArray: (opts && opts.concatArray),
      });
    resultObject = prototypeClonedObject;
  } else {
    resultObject = {};
  }

  mergeDeeplyInernally(isCloneMode ? resultObject : object1, object2,
    {
      assignToObject: isOverwriteMode ? object1 : resultObject,
      concatArray: (opts && opts.concatArray),
    });

  return resultObject;
}

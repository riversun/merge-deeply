//export default function mergeDeeply(object1, object2, opts) {
export default function mergeDeeply(opts) {


  let object1 = null;
  let object2 = null;
  let op = opts.op;
  if (!op) {
    throw Error('The initialization property "op" cannot be omitted. "merge","overwrite-merge","clone" can be specified.');
  }

  if (op === 'merge') {
    object1 = opts.object1;
    object2 = opts.object2;

    if (!(object1 && object2)) {
      throw Error('object1 or object2 is not specified.');
    }
  } else if (op === 'overwrite-merge') {
    opts.overwrite = true;
    object1 = opts.object1;
    object2 = opts.object2;

    if (!(object1 && object2)) {
      throw Error('object1 or object2 is not specified.');
    }
  } else if (op === 'clone') {
    object1 = opts.object1;
    object2 = {};
  } else {
    throw Error(`An invalid "op" property value "${op}" has been specified.`);
  }


  // Creates an object with the same prototype declaration as the object specified in the target.
  // In simple terms, this means copying the prototype
  const prototypeClonedObject = Object.create(Object.getPrototypeOf(object1));

  // You can also do the following, but there is no point in doing it because the property will be a shallow copy.
  //const prototypeClonedObject = Object.create(Object.getPrototypeOf(object1),Object.getOwnPropertyDescriptors(object1) );

  __mergeDeeplyInernally(object1, object1,
    {
      assignToObject: prototypeClonedObject,
      concatArray: (opts && opts.concatArray)
    });

  __mergeDeeplyInernally(prototypeClonedObject, object2,
    {
      assignToObject: (opts && opts.overwrite) ? object1 : prototypeClonedObject,
      concatArray: (opts && opts.concatArray)
    });

  return prototypeClonedObject;
}

function __mergeDeeplyInernally(target, source, opts) {

  const isObject = obj => obj && typeof obj === 'object' && !Array.isArray(obj);
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


  let result = Object.assign(assignToObject, target);

  if (isObject(target) && isObject(source)) {

    for (const [sourceKey, sourceValue] of Object.entries(source)) {

      const targetValue = target[sourceKey];

      if (isConcatArray && Array.isArray(sourceValue) && Array.isArray(targetValue) && (source !== target)) {
        result[sourceKey] = targetValue.concat(...sourceValue);
      } else if (isObject(sourceValue) && target.hasOwnProperty(sourceKey)) {
        result[sourceKey] = __mergeDeeplyInernally(targetValue, sourceValue, opts);
      } else {
        Object.assign(result, { [sourceKey]: sourceValue });
      }
    }
  }
  return result;
}

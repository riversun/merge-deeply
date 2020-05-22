export default function hasOwnPrototype(obj) {
  return Object.getPrototypeOf(obj) !== Object.prototype;
}

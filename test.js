const objesh = require('./index.js'); // Replace './obj-ops' with the correct path to your module

// Test data
const object1 = { a: 1, b: 2, c: 3 };
const object2 = { a: 10, b: 'two', c: 4, d: 5 };
const priorityProperties = ['c', 'b'];

// Function calls and expected outputs
console.log('isEmpty:', objesh.isEmpty({})); // Expected output: true
console.log('getKeys:', objesh.getKeys(object1)); // Expected output: [ 'a', 'b', 'c' ]
console.log('getValues:', objesh.getValues(object2)); // Expected output: [ 10, 'two', 4, 5 ]
console.log('clone:', objesh.clone(object1)); // Expected output: { a: 1, b: 2, c: 3 }
console.log('isEqual:', objesh.isEqual(object1, object2)); // Expected output: false
console.log('getCommonProperties:', objesh.getCommonProperties(object1, object2)); // Expected output: { commonProps1: { c: 3, b: 2 }, commonProps2: { c: 4, b: 'two' } }
console.log('mergeObjects:', objesh.merge(object1, object2, priorityProperties)); // Expected output: { c: 3, b: 2, d: 5 }

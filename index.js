module.exports = {
  // Function to check if an object is empty
  isEmpty: (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  },
  // Function to get keys of an object
  getKeys: (obj) => {
    return Object.keys(obj) || [];
  },

  // Function to get values of an object
  getValues: (obj) => {
    return Object.values(obj) || [];
  },

  // Function to clone an object
  clone: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  },

  // Function to compare two ojects
  isEqual: (obj1, obj2) => {
    return areObjectsEqual(obj1, obj2);
  },

  // Function to get commaon properties
  getCommonProperties: (obj1, obj2) => {
    return getCommonProps(obj1, obj2);
  },

  // Function to merge two properties
  merge: (obj1, obj2, propertiesArray) => {
    return mergeObjects(obj1, obj2, propertiesArray);
  },

};


//merging two objects
function mergeObjects(obj1, obj2, propertiesArray) {
  const merged = {};

  if (propertiesArray && propertiesArray.length > 0) {
    // Take properties from obj1 based on the given propertiesArray
    for (const prop of propertiesArray) {
      if (obj1.hasOwnProperty(prop)) {
        merged[prop] = obj1[prop];
      }
    }

    // Take remaining properties from obj2
    for (const prop in obj2) {
      if (!merged.hasOwnProperty(prop)) {
        merged[prop] = obj2[prop];
      }
    }
  } else {
    // Merge objects prioritizing properties from obj2
    for (const prop in obj1) {
      merged[prop] = obj2.hasOwnProperty(prop) ? obj2[prop] : obj1[prop];
    }

    for (const prop in obj2) {
      if (!obj1.hasOwnProperty(prop)) {
        merged[prop] = obj2[prop];
      }
    }
  }

  return merged;
}

//common properties
function getCommonProps(obj1, obj2) {
  const commonProps1 = {};
  const commonProps2 = {};

  for (const key in obj1) {
    if (obj2.hasOwnProperty(key)) {
      commonProps1[key] = obj1[key];
      commonProps2[key] = obj2[key];
    }
  }

  return { commonProps1, commonProps2 };
}

//comparison methods
function areObjectsEqual(obj1, obj2) {
  // Check if both arguments are objects
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }

  // Get keys from both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iterate through keys of obj1 and compare values recursively
  for (const key of keys1) {
    // Check if the key exists in obj2
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }

    const val1 = obj1[key];
    const val2 = obj2[key];

    // Check if the values of the keys are objects
    if (typeof val1 === 'object' && typeof val2 === 'object') {
      // Recursively check nested objects
      if (!areObjectsEqual(val1, val2)) {
        return false;
      }
    } else if (Array.isArray(val1) && Array.isArray(val2)) {
      // Check if both values are arrays
      if (!arraysAreEqual(val1, val2)) {
        return false;
      }
    } else if (val1 !== val2) {
      // Values are not objects, arrays, or equal
      return false;
    }
  }

  // If all checks pass, objects are considered equal
  return true;
}

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (typeof arr1[i] === 'object' && typeof arr2[i] === 'object') {
      if (!areObjectsEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
      if (!arraysAreEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}


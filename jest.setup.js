// Polyfill for _toString error with react-native-dropdown-select-list and Hermes
if (typeof global._toString === 'undefined') {
  global._toString = function(obj) {
    if (obj === null) return 'null';
    if (obj === undefined) return 'undefined';
    return obj.toString ? obj.toString() : String(obj);
  };
}


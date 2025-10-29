// This file ensures polyfills are loaded BEFORE any other code
// It's imported via metro.config.js

// Global polyfills for Hermes compatibility
if (typeof global._toString === 'undefined') {
  global._toString = function(obj) {
    if (obj === null) return 'null';
    if (obj === undefined) return 'undefined';
    return obj.toString ? obj.toString() : String(obj);
  };
}

if (typeof global._from === 'undefined') {
  global._from = function(arrayLike) {
    return Array.from ? Array.from(arrayLike) : [].slice.call(arrayLike);
  };
}

// Also ensure Symbol exists for Hermes
if (typeof Symbol === 'undefined' && typeof global.Symbol === 'undefined') {
  global.Symbol = function(name) { return '@' + name; };
  global.Symbol.iterator = '@@iterator';
}

// Reanimated polyfill for Hermes
if (typeof global._valueUnpacker === 'undefined') {
  global._valueUnpacker = function(value) {
    'worklet';
    return value;
  };
}

module.exports = {};


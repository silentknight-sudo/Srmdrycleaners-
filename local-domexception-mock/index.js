const NativeDOMException = typeof globalThis !== 'undefined' ? globalThis.DOMException : null;

module.exports = NativeDOMException || class DOMException extends Error {
  constructor(message, name) {
    super(message);
    this.name = name || "DOMException";
  }
};

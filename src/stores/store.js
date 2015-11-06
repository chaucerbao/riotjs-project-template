class Store {
  constructor() {
    riot.observable(this);

    this._cache = {};
  }

  cache(key, duration) {
    this._cache[key] = Date.now() + duration * 1000;

    return this._cache[key];
  }

  clearCache(...keys) {
    let i = keys.length;

    if (i) {
      while (i--) {
        delete this._cache[keys[i]];
      }
    } else {
      this._cache = {};
    }
  }

  isCached(key) {
    return (typeof this._cache[key] !== "undefined" && this._cache[key] > Date.now());
  }
}

export default Store;

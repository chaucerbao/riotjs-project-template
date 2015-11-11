class Store {
  constructor() {
    riot.observable(this);

    this._cache = {};
  }

  cache(key, duration, callback) {
    let now = Date.now();

    if (!this._cache[key] || now > this._cache[key].expires) {
      this._cache[key] = {
        result: callback(),
        expires: now + duration * 1000
      };
    }

    return this._cache[key].result;
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
}

export default Store;

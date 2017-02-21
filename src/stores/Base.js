// Dependencies
import { observable } from 'riot';

// Status codes
const PENDING = 1;
const LOADED = 2;

// Store
class BaseStore {
  constructor() {
    this._model = BaseModel;
    this._cache = {};
    this._fetchStatus = {};

    return observable(this);
  }

  // Load instance from cache and update the properties
  _load(id, properties = {}) {
    this._cache[id] = (this._cache[id] || new this._model(this))._update(
      properties
    );

    return this._cache[id];
  }

  // Fetch a URL and return the response, while handling duplicate requests
  async _fetch(request, target) {
    try {
      // Throw, if a request is currently pending
      if (this._fetchStatus[target] === PENDING) {
        throw Error(
          `Request for '${this.constructor.name}.${target}' already pending`
        );
      }

      // Set status to `pending` during the fetch
      this._fetchStatus[target] = PENDING;

      // Fetch the request
      const response = await fetch(request);
      const responseBody = await response.json();

      // Set status to `loaded`
      this._fetchStatus[target] = LOADED;

      return responseBody;
    } catch (err) {
      throw err;
    }
  }
}

// Model
class BaseModel {
  constructor(store) {
    this._store = store;

    return observable(this);
  }

  // Update only existing properties
  _update(properties) {
    return Object.keys(properties).reduce(
      (model, key) => {
        if (typeof model[key] !== 'undefined') {
          model[key] = properties[key];
        }

        return model;
      },
      this
    );
  }
}

export { BaseStore, BaseModel };

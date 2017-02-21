// Dependencies
import { observable } from 'riot';

// Store
class BaseStore {
  constructor() {
    this._model = BaseModel;
    this._cache = {};
    this._pendingRequests = [];

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
  async _fetch(request) {
    const pendingKey = btoa(JSON.stringify(request));
    const pendingIndex = this._pendingRequests.indexOf(pendingKey);

    try {
      // Throw, if a request is currently pending
      if (pendingIndex > -1) {
        throw Error(`Request in '${this.constructor.name}' already pending`);
      }

      // Set request to `pending` during the fetch
      this._pendingRequests.push(pendingKey);

      // Fetch the request
      const response = await fetch(request);
      const responseBody = await response.json();

      // Remove the `pending` status
      this._pendingRequests.splice(pendingIndex, 1);

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

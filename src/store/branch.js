// Dependencies
import { observable } from "riot";
import fetch from "isomorphic-fetch";

const baseUrl = "http://jsonplaceholder.typicode.com";
const cacheFor = 300;

export default class Branch {
  constructor(initialState = {}) {
    observable(this);

    // State
    this.isLoading = false;
    this.items = initialState.items || [];
    this.updatedAt = initialState.items ? Date.now() : 0;
  }

  fetchItems() {
    // Check if loading is already in progress
    if (this.isLoading) {
      return Promise.reject("Loading already in progress");
    }

    // Check the cache
    if (Date.now() - this.updatedAt < cacheFor * 1000) {
      this.trigger("itemsLoaded", this.items);

      return Promise.resolve();
    }

    this.isLoading = true;
    this.trigger("isLoading");

    return fetch(`${baseUrl}/posts`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("Server unable to process request");
      })
      .then(items => {
        // Update the state
        this.isLoading = false;
        this.items = items;
        this.updatedAt = Date.now();

        this.trigger("itemsLoaded", this.items);
      })
      .catch(exception => this.fetchError(exception));
  }

  fetchError(exception) {
    this.isLoading = false;
    this.trigger("fetchError", exception);

    throw exception;
  }
}

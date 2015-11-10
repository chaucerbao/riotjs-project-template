import Store from "./store";

// Singleton instance
let instance = null;

// Fake database
let database = [{
  id: 1,
  name: "Resource A"
}, {
  id: 2,
  name: "Resource B"
}, {
  id: 3,
  name: "Resource C"
}];

class Resource extends Store {
  constructor() {
    super();

    if (instance) {
      return instance;
    }

    this.state = {
      items: [],
      item: {}
    };

    this.bindEvents();

    return (instance = this);
  }

  bindEvents() {
    this.on("resource:load-items", () => {
      this.cache("resource:load-items", 5, () => {
        return new Promise((resolve, reject) => {
          // Fake AJAX call with latency
          setTimeout(() => {
            this.state.items = database;

            resolve();
          }, 250);
        });
      }).then(() => {
        this.trigger("resource:items-loaded", this.state.items);
      });
    });

    this.on("resource:load-item", (id) => {
      this.cache("resource:load-item", 5, () => {
        return new Promise((resolve, reject) => {
          // Fake AJAX call with latency
          setTimeout(() => {
            this.state.item = database[id - 1];

            resolve();
          }, 250);
        });
      }).then(() => {
        this.trigger("resource:item-loaded", this.state.item);
      });

    });
  }
}

export default Resource;

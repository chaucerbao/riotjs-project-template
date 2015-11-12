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
    this.one("resource:load-items", function loadItems() {
      this.cache("resource:load-items", 5, () => {
        return new Promise((resolve, reject) => {
          // Fake AJAX call with latency
          setTimeout(() => {
            resolve(database);
          }, 200);
        });
      }).then((items) => {
        this.state.items = items;
        this.trigger("resource:items-loaded", this.state.items);
        this.one("resource:load-items", loadItems);
      }, () => {
        this.one("resource:load-items", loadItems);
      });
    });

    this.on("resource:load-item", (id) => {
      this.cache(`resource:load-item-${id}`, 5, () => {
        return new Promise((resolve, reject) => {
          // Fake AJAX call with latency
          setTimeout(() => {
            resolve(database[id - 1]);
          }, 200);
        });
      }).then((item) => {
        this.state.item = item;
        this.trigger("resource:item-loaded", this.state.item);
      });

    });
  }
}

export default Resource;

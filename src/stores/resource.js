// Singleton instance
let instance = null;
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

class Resource {
  constructor() {
    if (instance) {
      return instance;
    }

    riot.observable(this);

    this.state = {
      items: [],
      item: {}
    };

    this.bindEvents();

    return instance = this;
  }

  bindEvents() {
    this.on("resource:load-items", () => {
      // Fake AJAX call with latency
      setTimeout(() => {
        this.state.items = database;

        this.trigger("resource:items-loaded", this.state.items);
      }, 250);
    });

    this.on("resource:load-item", (id) => {
      // Fake AJAX call with latency
      setTimeout(() => {
        this.state.item = database[id - 1];

        this.trigger("resource:item-loaded", this.state.item);
      }, 250);
    });
  }
}

export default Resource;

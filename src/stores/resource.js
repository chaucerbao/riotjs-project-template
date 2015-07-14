// Singleton instance
let instance = null;

class Resource {
  constructor() {
    if (instance) {
      return instance;
    }

    riot.observable(this);

    this.isLoaded = false;
    this.state = {
      items: []
    };

    this.bindEvents();

    return instance = this;
  }

  bindEvents() {
    this.on("resource:load", (forceReload) => {
      if (!this.isLoaded || forceReload) {
        // Fake AJAX call with latency
        setTimeout(() => {
          this.state.items = [{
            name: "Resource A"
          }, {
            name: "Resource B"
          }, {
            name: "Resource C"
          }];

          this.trigger("resource:loaded", this.state);
          this.isLoaded = true;
        }, 250);
      } else {
        this.trigger("resource:loaded", this.state);
      }
    });
  }
}

export default Resource;

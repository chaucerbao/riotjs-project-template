// Singleton instance
let instance = null;

class Router {
  constructor(body) {
    if (instance) {
      return instance;
    }

    this.body = body;
    this.page = null;
    this.routes();

    riot.route.base("/");
    riot.route.start(true);

    return instance = this;
  }

  // Routing logic
  routes() {
    riot.route("@", () => {
      require(["pages/homepage"], () => {
        this.mount("homepage");
      });
    });

    riot.route("resource/*", (id) => {
      require(["pages/resource"], () => {
        this.mount("resource", {
          id
        });
      });
    });
  }

  mount(page, params = {}) {
    // Unmount the active page, if mounted
    if (this.page) {
      this.page.unmount();
    }

    // Create a tag in the DOM for the new page
    this.body.appendChild(document.createElement(page));

    // Mount the new tag
    this.page = riot.mount(page, params)[0];
  }
}

export default Router;

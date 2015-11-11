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
    riot.route.start();
    riot.route.exec();

    return instance = this;
  }

  // Routing logic
  routes() {
    riot.route("@", () => {
      this.mount("homepage");
    });
    riot.route("resource/*", (id) => {
      this.mount("resource", {
        id: id
      });
    });
  }

  mount(page, params = {}) {
    require.ensure([], () => {
      // Load the page
      require(`pages/${page}/index.tag`);

      // Unmount the active page, if mounted
      if (this.page) {
        this.page.unmount();
      }

      // Create a tag in the DOM for the new page
      this.body.appendChild(document.createElement(page));

      // Mount the new tag
      this.page = riot.mount(page, params)[0];
    });
  }
}

export default Router;

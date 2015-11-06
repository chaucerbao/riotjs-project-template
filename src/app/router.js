// Singleton instance
let instance = null;

class Router {
  constructor(body) {
    if (instance) {
      return instance;
    }

    this.body = body;
    this.page = null;

    riot.route(this.routeTo.bind(this));
    riot.route.exec(this.routeTo.bind(this));

    return instance = this;
  }

  // Routing logic
  routeTo(page, ...params) {
    if (page === "resource") {
      this.mount(page, {
        id: params[0]
      });
    } else {
      this.mount("homepage");
    }
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

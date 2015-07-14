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

  routeTo(...params) {
    let page = params[0];

    // Routing logic
    if (page === "about") {
      require.ensure(["pages/about"], () => {
        require("pages/about");
        this.mount(page);
      });
    } else {
      require.ensure(["pages/homepage"], () => {
        require("pages/homepage");
        this.mount("homepage");
      });
    }
  }

  mount(page) {
    // Unmount the active page, if mounted
    if (this.page) {
      this.page.unmount();
    }

    // Create a tag in the DOM for the new page
    this.body.appendChild(document.createElement(page));

    // Mount the new tag
    this.page = riot.mount(page)[0];
  }
}

export default Router;

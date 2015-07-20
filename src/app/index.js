// Load the site-wide styles
import "normalize.css/normalize";
import "./style";

// Load the stores
import Resource from "stores/resource";

// Load the router
import Router from "./router";

class App {
  constructor(element) {
    // Load the stores
    dispatcher.addStore(new Resource());

    // Load the router
    this.router = new Router(element);
  }
}

window.App = App;

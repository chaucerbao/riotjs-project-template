// Load the site-wide styles
import "normalize.css/normalize";
import "./style";

// Load the stores
import Resource from "stores/resource";
dispatcher.addStore(new Resource());

// Load the router
import Router from "./router";
new Router(document.getElementById("site-body"));

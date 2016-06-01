// Dependencies
import { mount } from "riot";
import router from "./router";
import store from "./store";

// Mount the app
import "app";
mount("app");

// Start routing
router("/", ".site__body", { store });

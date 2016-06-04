// Dependencies
import { mount } from "riot";
import router from "./router";
import store from "./store";

// Mount the application
import "application";
mount("application");

// Start routing
router("/", ".site__body", { store });

import { route, mount } from "riot";

const routes = {
  "/": () => require(["pages/homepage"], mountTag.bind(null, "homepage", { page: 1 })),
  "/page-*": (page) => require(["pages/homepage"], mountTag.bind(null, "homepage", { page })),
  "/resource/*": (id) => require(["pages/resource"], mountTag.bind(null, "resource", { id }))
};

let mountTag;

export default function router(base, mountPoint, opts = {}) {
  route.base(base);

  mountTag = (tag, additionalOpts = {}) => mount(mountPoint, tag, Object.assign(opts, additionalOpts));

  for (const path in routes) {
    route(path, routes[path]);
  }

  // Page not found (Error 404)
  route(() => require(["pages/not-found-404"], mountTag.bind(null, "not-found-404")));

  route.start(true);
}

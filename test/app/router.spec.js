import Router from "app/router";

let expect = chai.expect;

describe("Router", () => {
  let router, body;

  before(() => {
    body = document.createElement("main");

    document.body.appendChild(body);
    router = new Router(body);
  });

  after(() => {
    document.body.removeChild(body);
  });

  // Singleton
  it("is a singleton", () => {
    let symbol = router.someVariable = Symbol();

    let anotherRouter = new Router();

    expect(anotherRouter.someVariable).to.equal(symbol);

    delete router.someVariable;
  });

  // Updating the route mounts its respective page
  it("mounts the homepage", (done) => {
    expect(body.querySelector("homepage")).to.be.null;

    riot.route("homepage");

    setTimeout(() => {
      expect(body.querySelector("homepage")).not.to.be.null;
      done();
    }, 100);
  });

  it("mounts the resource page", (done) => {
    expect(body.querySelector("resource")).to.be.null;

    riot.route("resource/2");

    setTimeout(() => {
      expect(body.querySelector("resource")).not.to.be.null;
      done();
    }, 100);
  });
});

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
    router.someVariable = 8675309;

    let anotherRouter = new Router();

    expect(anotherRouter.someVariable).to.equal(8675309);

    delete router.someVariable;
  });

  // Updating the route mounts its respective page
  it("mounts the homepage", (done) => {
    expect(document.body.querySelector("homepage")).to.be.null;

    riot.route("homepage");

    setTimeout(() => {
      expect(document.body.querySelector("homepage")).not.to.be.null;
      done();
    }, 300);
  });

  it("mounts the about page", (done) => {
    expect(document.body.querySelector("about")).to.be.null;

    riot.route("about");

    setTimeout(() => {
      expect(document.body.querySelector("about")).not.to.be.null;
      done();
    }, 300);
  });
});

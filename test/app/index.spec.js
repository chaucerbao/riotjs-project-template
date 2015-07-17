import "app";
import Resource from "stores/resource";

let expect = chai.expect;

describe("Application", () => {
  let app, body;

  before(() => {
    body = document.createElement("main");

    document.body.appendChild(body);
    app = new App(body);
  });

  after(() => {
    document.body.removeChild(body);
  });

  // Stores are loaded
  it("loads the stores", () => {
    expect(dispatcher._stores).to.contain(new Resource());
  });
});

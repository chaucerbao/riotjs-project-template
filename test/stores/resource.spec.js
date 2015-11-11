import Store from "stores/resource";

let expect = chai.expect;

describe("Resource store", () => {
  let store;

  before(() => {
    store = new Store();
  });

  // Singleton
  it("is a singleton", () => {
    let symbol = store.someVariable = Symbol();

    let anotherStore = new Store();

    expect(anotherStore.someVariable).to.equal(symbol);

    delete store.someVariable;
  });

  // Event callbacks
  it("responds to the `resource:load-items` event", (done) => {
    // Listener
    store.on("resource:items-loaded", (resources) => {
      expect(resources).to.have.length(3);
      done();
    });

    store.trigger("resource:load-items");
  });

  it("responds to the `resource:load-item` event", (done) => {
    // Listener
    store.on("resource:item-loaded", (resource) => {
      expect(resource).to.have.all.keys(["id", "name"]);
      done();
    });

    store.trigger("resource:load-item", 2);
  });
});

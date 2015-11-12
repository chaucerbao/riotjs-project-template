import Store from "stores/resource";

let expect = chai.expect;

describe("Resource store", () => {
  let store;

  before(() => {
    store = new Store();
  });

  beforeEach(() => {
    store.clearCache();
  });

  // Singleton
  it("is a singleton", () => {
    let symbol = store.someVariable = Symbol();

    let anotherStore = new Store();

    expect(anotherStore.someVariable).to.equal(symbol);

    delete store.someVariable;
  });

  // Event callbacks
  describe("resource:load-items", () => {
    it("emits an array of resources", (done) => {
      // Listener
      store.on("resource:items-loaded", (resources) => {
        expect(resources).to.be.an.instanceof(Array);
        expect(resources).to.have.length(3);
        done();
      });

      store.trigger("resource:load-items");
    });

    it("runs one instance at a time", (done) => {
      let counter = 0;

      // Listener
      store.on("resource:items-loaded", () => {
        counter++;
      });

      // First trigger
      store.trigger("resource:load-items");

      // Second trigger
      setTimeout(() => {
        store.trigger("resource:load-items");
      }, 50);

      // First trigger is complete
      setTimeout(() => {
        expect(counter).to.equal(1);

        // Third trigger (should be available)
        store.clearCache();
        store.trigger("resource:load-items");
      }, 205);

      // Second trigger should not have registered
      setTimeout(() => {
        expect(counter).to.equal(1);
      }, 405);

      // Third trigger is complete
      setTimeout(() => {
        expect(counter).to.equal(2);
        done();
      }, 410);
    });
  });

  describe("resource:load-item", () => {
    it("emits a resource object", (done) => {
      // Listener
      store.on("resource:item-loaded", (resource) => {
        expect(resource).to.be.an.instanceof(Object);
        expect(resource).to.have.all.keys(["id", "name"]);
        done();
      });

      store.trigger("resource:load-item", 2);
    });
  });
});

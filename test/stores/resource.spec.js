import Store from "stores/resource";

let expect = chai.expect;

describe("Resource store", () => {
  let store;

  before(() => {
    store = new Store();
    dispatcher.addStore(store);
  });

  // Singleton
  it("is a singleton", () => {
    store.someVariable = 8675309;

    let anotherStore = new Store();

    expect(anotherStore.someVariable).to.equal(8675309);

    delete store.someVariable;
  });

  // Listen to events from the dispatcher
  it("responds to the `resource:load` event", (done) => {
    sinon.spy(store, "trigger");

    dispatcher.trigger("resource:load");

    setTimeout(() => {
      expect(store.isLoaded).to.be.true;
      expect(store.trigger.withArgs("resource:loaded", sinon.match({
        items: [{
          name: "Resource A"
        }, {
          name: "Resource B"
        }, {
          name: "Resource C"
        }]
      })).calledOnce).to.be.true;

      store.trigger.restore();
      done();
    }, 300);
  });
});

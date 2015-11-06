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
    let spy = sinon.spy(store, "trigger");

    store.trigger("resource:load-items");

    setTimeout(() => {
      expect(spy.withArgs("resource:items-loaded", [{
        id: 1,
        name: "Resource A"
      }, {
        id: 2,
        name: "Resource B"
      }, {
        id: 3,
        name: "Resource C"
      }]).calledOnce).to.be.true;

      store.trigger.restore();
      done();
    }, 300);
  });

  it("responds to the `resource:load-item` event", (done) => {
    let spy = sinon.spy(store, "trigger");

    store.trigger("resource:load-item", 2);

    setTimeout(() => {
      expect(spy.withArgs("resource:item-loaded", {
        id: 2,
        name: "Resource B"
      }).calledOnce).to.be.true;

      store.trigger.restore();
      done();
    }, 300);
  });
});

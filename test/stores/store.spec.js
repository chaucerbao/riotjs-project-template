import Store from "stores/store";

let expect = chai.expect;

describe("Store store", () => {
  let store;

  before(() => {
    store = new Store();
  });

  beforeEach(() => {
    store._cache = {};
  });

  // Caching functions
  it("keeps track of expiration times", () => {
    expect(store._cache).to.be.empty;

    store.cache('key-1', 10);
    store.cache('key-2', -10);

    expect(store._cache).to.have.all.keys(['key-1', 'key-2']);
    expect(store._cache['key-1']).to.be.greaterThan(Date.now());
    expect(store._cache['key-2']).to.be.lessThan(Date.now());
  });

  it("clears all expiration times", () => {
    store._cache = {
      'key-1': 1,
      'key-2': 2
    };

    store.clearCache();

    expect(store._cache).to.be.empty;
  });

  it("clears specific expiration times", () => {
    store._cache = {
      'key-1': 1,
      'key-2': 2,
      'key-3': 3
    };

    store.clearCache('key-1', 'key-3');

    expect(store._cache).to.have.all.keys(['key-2']);
  });

  it("checks if a specific expiration time has passed", () => {
    store._cache = {
      'key-1': 8640000000000000,
      'key-2': 0
    };

    expect(store.isCached('key-1')).to.be.true;
    expect(store.isCached('key-2')).to.be.false;
  });
});

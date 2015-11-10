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
  describe("cache(key, duration, callback)", () => {
    it("executes the `callback` and caches the result", (done) => {
      let state = 0;

      store.cache("key-1", 1, () => {
        state = 1;
      });

      setTimeout(() => {
        store.cache("key-1", 1, () => {
          state = 2;
        });

        expect(state).to.equal(1);
        done();
      }, 100);
    });

    it("expires the cached result after the `duration` in seconds", (done) => {
      let state = 0;

      store.cache("key-1", .05, () => {
        state = 1;
      });

      setTimeout(() => {
        store.cache("key-1", .05, () => {
          state = 2;
        });

        expect(state).to.equal(2);
        done();
      }, 100);
    });
  });

  describe("clearCache(...keys)", () => {
    it("clears all cached results", () => {
      store.cache("key-1", 1, () => {});
      store.cache("key-2", 1, () => {});

      expect(store._cache).to.have.all.keys(["key-1", "key-2"]);

      store.clearCache();

      expect(store._cache).to.be.empty;
    });

    it("clears specific cached results", () => {
      store.cache("key-1", 1, () => {});
      store.cache("key-2", 1, () => {});
      store.cache("key-3", 1, () => {});

      expect(store._cache).to.have.all.keys(["key-1", "key-2", "key-3"]);

      store.clearCache("key-1", "key-3");

      expect(store._cache).to.have.all.keys(["key-2"]);
    });
  });
});

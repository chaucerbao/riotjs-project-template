// Dependencies
import { expect } from "chai";
import nock from "nock";
import sinon from "sinon";

// Test item
import Branch from "../../src/store/branch";

describe("Branch store", () => {
  before(() => {
    sinon.stub(Date, "now", () => 1234567890);
  });

  after(() => {
    Date.now.restore();
  });

  it("sets the default state", () => {
    const branch = new Branch();

    expect(branch.isLoading).to.be.false;
    expect(branch.items).to.deep.equal([]);
    expect(branch.updatedAt).to.equal(0);
  });

  it("accepts an initial state", () => {
    const branch = new Branch({
      items: [{ id: 1 }]
    });

    expect(branch.isLoading).to.be.false;
    expect(branch.items).to.deep.equal([{ id: 1 }]);
    expect(branch.updatedAt).to.equal(1234567890);
  });

  describe("fetchItems()", () => {
    const baseURL = "http://jsonplaceholder.typicode.com";
    let branch;

    beforeEach(() => {
      branch = new Branch();
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it("GETs a list of items", done => {
      const callback = sinon.spy();

      branch.on("isLoading", () => {
        expect(branch.isLoading).to.be.true;

        callback();
      });

      branch.on("itemsLoaded", items => {
        expect(items).to.deep.equal([{ id: 1 }]);

        // Expect the state to be updated
        expect(branch.isLoading).to.be.false;
        expect(branch.items).to.deep.equal([{ id: 1 }]);
        expect(branch.updatedAt).to.equal(1234567890);

        callback();
      });

      nock(baseURL)
        .get("/posts")
        .reply(200, [{ id: 1 }]);

      branch.fetchItems()
        .then(() => { expect(callback.calledTwice).to.be.true; })
        .then(done).catch(done);
    });

    it("throws an exception if the fetch fails", done => {
      const callback = sinon.spy();

      branch.on("isLoading", () => {
        expect(branch.isLoading).to.be.true;

        callback();
      });

      branch.on("fetchError", () => {
        expect(branch.isLoading).to.be.false;

        callback();
      });

      nock(baseURL)
        .get("/posts")
        .reply(500);

      branch.fetchItems()
        .catch(() => { expect(callback.calledTwice).to.be.true; })
        .then(done).catch(done);
    });

    it("throws an exception if loading is already in progress", done => {
      const callback = sinon.spy();

      branch.on("*", callback);

      branch.isLoading = true;

      branch.fetchItems()
        .catch(() => { expect(callback.called).to.be.false; })
        .then(done).catch(done);
    });

    describe("cache", () => {
      let http;

      beforeEach(() => {
        http = nock(baseURL)
          .get("/posts")
          .reply(200, []);
      });

      it("resolves on hit", done => {
        branch.updatedAt = 1234567890 - (299 * 1000);

        branch.fetchItems()
          .then(() => { expect(http.isDone()).to.be.false; })
          .then(done).catch(done);
      });

      it("fetches on miss", done => {
        branch.updatedAt = 1234567890 - (300 * 1000);

        branch.fetchItems()
          .then(() => { expect(http.isDone()).to.be.true; })
          .then(done).catch(done);
      });
    });
  });
});

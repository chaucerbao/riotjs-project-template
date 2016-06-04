// Dependencies
import { mount, observable } from "riot";
import { jsdom } from "jsdom";
import { expect } from "chai";
import sinon from "sinon";

// Test item
import "pages/homepage";

const mockStore = {
  branch: observable({
    fetchItems: () => {}
  })
};

describe("Homepage tag", () => {
  let store;

  before(() => {
    global.document = jsdom("<homepage />");
  });

  beforeEach(() => {
    // Prepare an empty, mock store
    store = Object.assign({}, mockStore);
  });

  it("mounts", () => {
    const tags = mount("homepage", { store });

    expect(tags).to.have.lengthOf(1);
    expect(tags[0].isMounted).to.be.true;
  });

  it("requests Branch items on mount", () => {
    const { branch } = store;

    branch.fetchItems = sinon.spy();
    mount("homepage", { store });

    expect(branch.fetchItems.calledOnce).to.be.true;
  });

  it("re-renders on Branch\'s `itemsLoaded` event", () => {
    const { branch } = store;
    const tags = mount("homepage", { store, perPage: 2, page: 2 });
    const tag = tags[0];

    sinon.spy(tag, "update");
    branch.items = [1, 2, 3, 4, 5];
    branch.trigger("itemsLoaded");

    expect(tag.items).to.deep.equal([3, 4]);
    expect(tag.previousPage).to.equal(1);
    expect(tag.nextPage).to.equal(3);
    expect(tag.update.calledOnce).to.be.true;
  });
});

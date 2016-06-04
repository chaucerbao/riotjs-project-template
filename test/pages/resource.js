// Dependencies
import { mount, observable } from "riot";
import { jsdom } from "jsdom";
import { expect } from "chai";
import sinon from "sinon";

// Test item
import "pages/resource";

const mockStore = {
  branch: observable({
    fetchItems: () => {}
  })
};

describe("Resource tag", () => {
  let store;

  before(() => {
    global.document = jsdom("<resource />");
  });

  beforeEach(() => {
    // Prepare an empty, mock store
    store = Object.assign({}, mockStore);
  });

  it("mounts", () => {
    const tags = mount("resource", { store });

    expect(tags).to.have.lengthOf(1);
    expect(tags[0].isMounted).to.be.true;
  });

  it("requests Branch items on mount", () => {
    const { branch } = store;

    branch.fetchItems = sinon.spy();
    mount("resource", { store });

    expect(branch.fetchItems.calledOnce).to.be.true;
  });

  it("re-renders on Branch\'s `itemsLoaded` event", () => {
    const { branch } = store;
    const tags = mount("resource", { store, id: 2 });
    const tag = tags[0];

    sinon.spy(tag, "update");
    branch.items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    branch.trigger("itemsLoaded");

    expect(tag.item).to.deep.equal({ id: 2 });
    expect(tag.update.calledOnce).to.be.true;
  });
});

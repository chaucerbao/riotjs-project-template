// Dependencies
import { mount } from "riot";
import { jsdom } from "jsdom";
import { expect } from "chai";

// Test item
import "pages/not-found-404";

describe("Not Found 404 tag", () => {
  before(() => {
    global.document = jsdom("<not-found-404 />");
  });

  it("mounts", () => {
    const tags = mount("not-found-404");

    expect(tags).to.have.lengthOf(1);
    expect(tags[0].isMounted).to.be.true;
  });
});

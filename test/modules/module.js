// Dependencies
import { mount } from "riot";
import { jsdom } from "jsdom";
import { expect } from "chai";

// Test item
import "modules/module";

describe("<module />", () => {
  before(() => {
    global.document = jsdom("<module />");
  });

  it("mounts", () => {
    const tags = mount("module");

    expect(tags).to.have.lengthOf(1);
    expect(tags[0].isMounted).to.be.true;
  });
});

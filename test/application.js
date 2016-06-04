// Dependencies
import { mount } from "riot";
import { jsdom } from "jsdom";
import { expect } from "chai";

// Test item
import "application";

describe("<application />", () => {
  before(() => {
    global.document = jsdom("<application />");
  });

  it("mounts", () => {
    const tags = mount("application");

    expect(tags).to.have.lengthOf(1);
    expect(tags[0].isMounted).to.be.true;
  });
});

// Dependencies
import { mount } from "riot";
import { jsdom } from "jsdom";
import { expect } from "chai";

// Test item
import "app";

describe("App tag", () => {
  before(() => {
    global.document = jsdom("<app />");
  });

  it("mounts", () => {
    const tags = mount("app");

    expect(tags).to.have.lengthOf(1);
    expect(tags[0].isMounted).to.be.true;
  });
});

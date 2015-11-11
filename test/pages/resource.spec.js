import "pages/resource";

let expect = chai.expect;

describe("Resource tag", () => {
  let tag, element;

  before(() => {
    element = document.createElement("resource");
    document.body.appendChild(element);

    tag = riot.mount("resource")[0];
  });

  after(() => {
    tag.unmount();
  });

  // Mounts
  it("mounts", () => {
    expect(tag.isMounted).to.be.true;
  });

  // Renders the properties
  it("renders the `result` property", () => {
    tag.result = "";
    tag.update();

    expect(element.querySelector("p").innerHTML).to.not.contain("Lorem ipsum dolor sit amet");

    tag.result = "Lorem ipsum dolor sit amet";
    tag.update();

    expect(element.querySelector("p").innerHTML).to.contain("Lorem ipsum dolor sit amet");
  });

  // Event callbacks
  describe("onResourceLoaded", () => {
    it("renders the `resource` property", () => {
      tag.resource = {};
      tag.update();

      expect(element.querySelector("h1").innerHTML).to.equal(" (#)");

      tag.onResourceLoaded({
        id: 2,
        name: "Resource B"
      });

      expect(element.querySelector("h1").innerHTML).to.equal("Resource B (#2)");
    });
  });
});

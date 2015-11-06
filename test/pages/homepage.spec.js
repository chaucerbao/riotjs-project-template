import "pages/homepage";

let expect = chai.expect;

describe("Homepage tag", () => {
  let tag, element;

  before(() => {
    element = document.createElement("homepage");
    document.body.appendChild(element);

    tag = riot.mount("homepage")[0];
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
  describe("onResourcesLoaded", () => {
    it("renders the `resources` property", () => {
      tag.resources = [];
      tag.update();

      expect(element.querySelectorAll("li")).to.have.length(0);

      tag.onResourcesLoaded([{
        id: 1,
        name: "Resource A"
      }, {
        id: 2,
        name: "Resource B"
      }]);

      expect(tag.resources).to.have.length(2);
      expect(element.querySelectorAll("li")).to.have.length(2);
    });
  });
});

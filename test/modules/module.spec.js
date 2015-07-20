import "modules/module";

let expect = chai.expect;

describe("Module tag", () => {
  let tag, element;

  before(() => {
    element = document.createElement("module");
    document.body.appendChild(element);

    tag = riot.mount("module")[0];
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
    tag.result = "Lorem ipsum";
    tag.update();

    expect(element.querySelector("p").innerHTML).to.contain("Lorem ipsum");

    tag.result = "Dolor sit amet";
    tag.update();

    expect(element.querySelector("p").innerHTML).to.contain("Dolor sit amet");
  });

  it("renders the `resources` property", () => {
    tag.resources = [];
    tag.update();

    expect(element.querySelectorAll("li")).to.have.length(0);

    tag.resources = [{
      name: "One"
    }, {
      name: "Two"
    }];
    tag.update();

    expect(element.querySelectorAll("li")).to.have.length(2);
  });

  // Dispatcher's event handlers
  describe('onResourceLoaded', () => {
    it("sets the `resources` property", () => {
      tag.resources = [];
      tag.update();

      expect(tag.resources).to.have.length(0);

      tag.onResourceLoaded({
        items: [{
          name: "One"
        }, {
          name: "Two"
        }, {
          name: "Three"
        }]
      });

      expect(tag.resources).to.have.length(3);
    });
  });
});

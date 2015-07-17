import Library from "lib/library";

let expect = chai.expect;

describe("Library", () => {
  describe("#add", () => {
    it("adds two numbers and returns the result", () => {
      expect(Library.add(1, 9)).to.equal(10);
      expect(Library.add(41, 66)).to.equal(107);
    });
  });
});

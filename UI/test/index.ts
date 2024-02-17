// test/index.ts
describe("index Demo", function () {
  it("navigate to page, assert the title and then click on myButton", function () {
    const index = browser.page.index();
    index.navigate().assertTitle().click("@myButton");
  });
});

// test/search.ts

describe("Search page Functionality", function () {
  beforeEach(function (browser, done) {
    const search = browser.page.search();
    search.navigate();
    done();
  });

  afterEach(function (browser, done) {
    const search = browser.page.search();
    search.end();
    done();
  });

  it("Asserts the search page title", async function () {
    const search = browser.page.search();
    await search.assertTitle();
  });

  it("Asserts the visibility of the form elements", async function () {
    const search = browser.page.search();
    const searchResults = search.section.searchResults;
    await search.assertElementVisibility("@searchForm");
    await search.assertElementVisibility("@searchInput");
    await search.assertSectionVisibility(searchResults.name);
  });

  it("Checks search results to be relevant (dress)", async function () {
    const search = browser.page.search();
    await search.populateSearchInput("dress");
    await search.assertSearchInput("dress");
    await search.submitSearch();
    const products = await search.getProductElements();
    const productNames = await search.getProductNames(products);
    productNames.forEach((name) => {
      search.verify.ok(name.includes("dress"), `${name} isn't a dress product`);
    });
  });
});

// nightwatch/pages/contact.ts
import {
  PageObjectModel,
  EnhancedPageObject,
  JSON_WEB_OBJECT,
} from "nightwatch";

const searchCommands = {
  // Asserts correct title
  assertTitle(this: Search) {
    return this.assert.titleEquals("Search - My Store");
  },
  // Asserts element visibility
  assertElementVisibility(this: Search, elementName: string) {
    return this.expect.element(elementName).to.be.visible;
  },
  // Assert section visibility
  assertSectionVisibility(this: Search, sectionName: string) {
    return this.expect.section(`@${sectionName}`).to.be.visible;
  },
  // Fills search field
  populateSearchInput(this: Search, searchKey: string) {
    return this.element("@searchInput").setValue(searchKey);
  },
  // Asserts the filled search field
  assertSearchInput(this: Search, searchKey: string) {
    return this.verify.valueEquals("@searchInput", searchKey);
  },
  // Submits search
  submitSearch(this: Search) {
    return this.element("@searchForm").submit();
  },
  // Get elements of products displayed after search
  getProductElements(this: Search) {
    return this.section.searchResults.findElements("@productName");
  },
  // Get a list of the visibile product names
  async getProductNames(this: Search, products: JSON_WEB_OBJECT[]) {
    const names: string[] = [];
    for (let i = 0; i < products.length; i++) {
      const id = products[i].getId();
      names.push((await browser.elementIdText(id)).toLowerCase());
    }
    return names;
  },
};

const search = {
  url: "/index.php?controller=search",
  commands: [searchCommands],
  elements: {
    searchForm: { selector: "#searchbox" },
    searchInput: { selector: "#search_query_top" },
  },
  sections: {
    searchResults: {
      selector: "#center_column",
      elements: {
        productName: { selector: ".product-name" },
      },
    },
  },
} satisfies PageObjectModel;

export interface Search
  extends EnhancedPageObject<
    typeof searchCommands,
    typeof search.elements,
    typeof search.sections
  > {}

export default search;

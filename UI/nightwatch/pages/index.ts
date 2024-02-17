// nightwatch/pages/index.ts
import { PageObjectModel, EnhancedPageObject } from "nightwatch";

const indexCommands = {
  assertTitle(this: EnhancedPageObject) {
    return this.assert.titleEquals("My Store");
  },
};

const index = {
  url: "/index.php",
  commands: [indexCommands],
  elements: {
    myButton: {
      selector: "#contact-link",
    },
  },
} satisfies PageObjectModel;

export interface Index
  extends EnhancedPageObject<typeof indexCommands, typeof index.elements> {}

export default index;

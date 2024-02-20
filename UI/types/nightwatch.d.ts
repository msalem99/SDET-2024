// types/nightwatch.d.ts
import "nightwatch";
import { Index } from "../nightwatch/pages/index";
import { Contact } from "../nightwatch/pages/contact";
import { Search } from "../nightwatch/pages/search";

declare module "nightwatch" {
  interface NightwatchCustomPageObjects {
    index(): Index;
    contact(): Contact;
    search(): Search;
  }
}

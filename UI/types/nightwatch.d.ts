// types/nightwatch.d.ts
import "nightwatch";
import { Contact } from "../nightwatch/pages/contact";
import { Search } from "../nightwatch/pages/search";

declare module "nightwatch" {
  interface NightwatchCustomPageObjects {
    contact(): Contact;
    search(): Search;
  }
}

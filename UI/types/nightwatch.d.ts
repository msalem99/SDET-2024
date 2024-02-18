// types/nightwatch.d.ts
import "nightwatch";
import { Index } from "../nightwatch/pages/index";
import { Contact } from "../nightwatch/pages/contact";

declare module "nightwatch" {
  interface NightwatchCustomPageObjects {
    index(): Index;
    contact(): Contact;
  }
}

// types/nightwatch.d.ts
import "nightwatch";
import { Index } from "../nightwatch/pages";

declare module "nightwatch" {
  interface NightwatchCustomPageObjects {
    index(): Index;
  }
}

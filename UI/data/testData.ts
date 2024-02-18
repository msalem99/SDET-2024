import path from "path";

export type subjectHeadingOptions = "Customer Service" | "Webmaster" | "";

export interface ContactUsForm {
  subjectHeading: subjectHeadingOptions;
  email: string;
  orderReference: string;
  attachFile: string;
  message: string;
}
export const validEmail: string = "test@test.com";
export const invalidEMail: string = "te$t@te$t.com";
//https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
export const emailRegex: RegExp =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
export const shortText: string =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin semper.";
export const longText: string = "t".repeat(1000);

export const imagePath = path.join(__dirname, "./image.jpg");

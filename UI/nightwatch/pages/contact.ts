// nightwatch/pages/contact.ts
import { PageObjectModel, EnhancedPageObject } from "nightwatch";
import { subjectHeadingOptions } from "../../data/testData";
import path from "path";

const contactCommands = {
  // Asserts visibility of the Title
  assertTitle(this: Contact) {
    return this.assert.titleEquals("Contact us - My Store");
  },
  // Asserts visibility of the Form
  assertForm(this: Contact) {
    return this.expect.section(`@${this.section.contactUsForm.name}`).to.be
      .visible;
  },
  // Asserts visibility of an element in the form
  assertFormElementVisibility(this: Contact, elementName: string) {
    return this.section.contactUsForm.expect.element(elementName).to.be.visible;
  },
  // Asserts presence of an element in the form
  assertFormElementPresence(this: Contact, elementName: string) {
    return this.section.contactUsForm.expect.element(elementName).to.be.present;
  },
  // Returns Form
  getForm(this: Contact) {
    return this.section.contactUsForm;
  },
  //Choose subject
  chooseSubjectHeading(this: Contact, option: subjectHeadingOptions) {
    if (option === "Customer Service") {
      return this.section.contactUsForm.click("@customerServiceHeading");
    }
    if (option === "Webmaster") {
      return this.section.contactUsForm.click("@webMasterHeading");
    }
  },
  // Assert subject heading field
  assertSubjectHeading(this: Contact, option: subjectHeadingOptions) {
    if (option === "Customer Service") {
      return this.section.contactUsForm.verify.textEquals(
        "@customerServiceHeading",
        "Customer service"
      );
    }
    if (option === "Webmaster") {
      return this.section.contactUsForm.verify.textEquals(
        "@webMasterHeading",
        "Webmaster"
      );
    }
  },
  // Populate email field
  populateEmail(this: Contact, emailData: string) {
    return this.section.contactUsForm.element("@email").setValue(emailData);
  },
  // Assert email field value
  assertEmail(this: Contact, emailData: string) {
    return this.section.contactUsForm.verify.valueEquals("@email", emailData);
  },

  // Populate order reference
  populateOrderReference(this: Contact, orderReference: string) {
    return this.section.contactUsForm
      .element("@orderReference")
      .setValue(orderReference);
  },
  // Assert order reference
  assertOrderReference(this: Contact, orderReference: string) {
    return this.section.contactUsForm.verify.valueEquals(
      "@orderReference",
      orderReference
    );
  },
  // Upload file
  uploadImage(this: Contact, filePath: string) {
    return this.section.contactUsForm.uploadFile("@fileUploadInput", filePath);
  },
  // Assert uploaded image
  assertUploadedImage(this: Contact, filePath: string) {
    return this.section.contactUsForm.verify.textEquals(
      "@fileUploadName",
      path.basename(filePath)
    );
  },
  // Populate message field
  populateMessage(this: Contact, message: string) {
    return this.section.contactUsForm.element("@message").setValue(message);
  },
  // Assert message field
  assertMessage(this: Contact, message: string) {
    return this.section.contactUsForm.verify.valueEquals("@message", message);
  },
  // Submit form
  submitContactForm(this: Contact) {
    return this.section.contactUsForm.element("@submit").click();
  },
  // Assert success message
  assertSuccess(this: Contact) {
    return this.assertFormElementVisibility("@successMessage");
  },
  // Assert failure message
  assertFailure(this: Contact) {
    return this.assertFormElementVisibility("@failureMessage");
  },
};

const contact = {
  url: "/index.php?controller=contact",
  commands: [contactCommands],
  elements: {},
  sections: {
    contactUsForm: {
      selector: "#center_column",
      elements: {
        subjectHeading: {
          selector: "#uniform-id_contact",
        },
        customerServiceHeading: {
          selector: "option[value='2']",
        },
        webMasterHeading: {
          selector: "option[value='1']",
        },
        email: {
          selector: "#email",
        },
        orderReference: {
          selector: "#id_order",
        },
        fileUploadName: {
          selector: ".filename",
        },
        fileUploadInput: {
          selector: "#fileUpload",
        },
        message: {
          selector: "#message",
        },
        submit: {
          selector: "#submitMessage",
        },
        successMessage: {
          selector: ".alert-success",
        },
        failureMessage: {
          selector: ".alert-danger",
        },
      },
    },
  },
} satisfies PageObjectModel;

export interface Contact
  extends EnhancedPageObject<
    typeof contactCommands,
    typeof contact.elements,
    typeof contact.sections
  > {}

export default contact;

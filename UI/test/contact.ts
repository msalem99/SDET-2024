// test/contact.ts
import {
  subjectHeadingOptions,
  ContactUsForm,
  validEmail,
  shortText,
  imagePath,
} from "../data/testData";

describe("Contact Page Functionality", function () {
  beforeEach(function (browser, done) {
    const contact = browser.page.contact();
    contact.navigate();
    done();
  });

  afterEach(function (browser, done) {
    const contact = browser.page.contact();
    contact.end();
    done();
  });

  it("Asserts the visibility of the form elements", async function () {
    const contact = browser.page.contact();
    await contact.assertTitle().assertForm();

    await contact.assertFormElementVisibility("@email");
    await contact.assertFormElementVisibility("@subjectHeading");
    await contact.assertFormElementVisibility("@orderReference");
    await contact.assertFormElementVisibility("@fileUploadName");
    await contact.assertFormElementVisibility("@message");
    await contact.assertFormElementVisibility("@submit");
  });

  it("Submits form with valid Data (All fields)", async function () {
    const contact = browser.page.contact();
    const contactUsFormData: ContactUsForm = {
      subjectHeading: "Customer Service",
      email: validEmail,
      orderReference: shortText,
      attachFile: imagePath,
      message: shortText,
    };
    await contact.chooseSubjectHeading(contactUsFormData.subjectHeading);
    await contact.assertSubjectHeading(contactUsFormData.subjectHeading);

    await contact.populateEmail(contactUsFormData.email);
    await contact.assertEmail(contactUsFormData.email);

    await contact.populateOrderReference(contactUsFormData.orderReference);
    await contact.assertOrderReference(contactUsFormData.orderReference);

    await contact.uploadImage(contactUsFormData.attachFile);
    await contact.assertUploadedImage(contactUsFormData.attachFile);

    await contact.populateMessage(contactUsFormData.message);
    await contact.assertMessage(contactUsFormData.message);

    await contact.submitContactForm();

    await contact.assertSuccess();
  });

  it("Submits form with valid Data (Mandatory fields)", async function () {
    const contact = browser.page.contact();
    const contactUsFormData: ContactUsForm = {
      subjectHeading: "Webmaster",
      email: validEmail,
      orderReference: shortText,
      attachFile: imagePath,
      message: shortText,
    };
    await contact.chooseSubjectHeading(contactUsFormData.subjectHeading);
    await contact.assertSubjectHeading(contactUsFormData.subjectHeading);

    await contact.populateEmail(contactUsFormData.email);
    await contact.assertEmail(contactUsFormData.email);

    await contact.populateMessage(contactUsFormData.message);
    await contact.assertMessage(contactUsFormData.message);

    await contact.submitContactForm();

    await contact.assertSuccess();
  });
});

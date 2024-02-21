// test/contact.ts
import {
  ContactUsForm,
  validEmail,
  shortText,
  imagePath,
  emailRegex,
  invalidEmailAddresses,
  longText,
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

  it("Asserts the contact page title", async function () {
    const contact = browser.page.contact();
    await contact.assertTitle();
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

  it("Fails to submit form with invalid Email (Mandatory fields)", async function () {
    for (let i = 0; i < invalidEmailAddresses.length; i++) {
      const contact = browser.page.contact();
      // this continues on failure so we need to navigate again
      contact.navigate();

      const contactUsFormData: ContactUsForm = {
        subjectHeading: "Webmaster",
        email: invalidEmailAddresses[i],
        orderReference: shortText,
        attachFile: imagePath,
        message: shortText,
      };
      await contact.assert.doesNotMatch(invalidEmailAddresses[i], emailRegex);

      await contact.chooseSubjectHeading(contactUsFormData.subjectHeading);
      await contact.assertSubjectHeading(contactUsFormData.subjectHeading);

      await contact.populateEmail(contactUsFormData.email);
      await contact.assertEmail(contactUsFormData.email);

      await contact.populateMessage(contactUsFormData.message);
      await contact.assertMessage(contactUsFormData.message);

      await contact.submitContactForm();

      await contact.assertFailure(`Email used : ${invalidEmailAddresses[i]}`);
    }
  });

  it("Fails to submit the form with empty email field data", async function () {
    const contact = browser.page.contact();
    const contactUsFormData: ContactUsForm = {
      subjectHeading: "Webmaster",
      email: "",
      orderReference: shortText,
      attachFile: imagePath,
      message: shortText,
    };
    await contact.chooseSubjectHeading(contactUsFormData.subjectHeading);
    await contact.assertSubjectHeading(contactUsFormData.subjectHeading);

    await contact.populateMessage(contactUsFormData.message);
    await contact.assertMessage(contactUsFormData.message);

    await contact.submitContactForm();

    await contact.assertFailure();
  });

  it("Fails to Submit form with empty subject header", async function () {
    const contact = browser.page.contact();
    const contactUsFormData: ContactUsForm = {
      subjectHeading: "",
      email: validEmail,
      orderReference: shortText,
      attachFile: imagePath,
      message: shortText,
    };

    await contact.populateEmail(contactUsFormData.email);
    await contact.assertEmail(contactUsFormData.email);

    await contact.populateMessage(contactUsFormData.message);
    await contact.assertMessage(contactUsFormData.message);

    await contact.submitContactForm();

    await contact.assertFailure();
  });

  it("Fails to Submit form with empty message field", async function () {
    const contact = browser.page.contact();
    const contactUsFormData: ContactUsForm = {
      subjectHeading: "Webmaster",
      email: validEmail,
      orderReference: shortText,
      attachFile: imagePath,
      message: "",
    };
    await contact.chooseSubjectHeading(contactUsFormData.subjectHeading);
    await contact.assertSubjectHeading(contactUsFormData.subjectHeading);

    await contact.populateEmail(contactUsFormData.email);
    await contact.assertEmail(contactUsFormData.email);

    await contact.submitContactForm();

    await contact.assertFailure();
  });

  it("Fails to submit form with a lengthy message (5k characters)", async function () {
    const contact = browser.page.contact();

    const contactUsFormData: ContactUsForm = {
      subjectHeading: "Webmaster",
      email: validEmail,
      orderReference: shortText,
      attachFile: imagePath,
      message: longText,
    };

    await contact.chooseSubjectHeading(contactUsFormData.subjectHeading);
    await contact.assertSubjectHeading(contactUsFormData.subjectHeading);

    await contact.populateEmail(contactUsFormData.email);
    await contact.assertEmail(contactUsFormData.email);

    await contact.populateMessage(contactUsFormData.message);
    await contact.assertMessage(contactUsFormData.message);

    await contact.submitContactForm();

    await contact.assertFailure();
  });

  it("Fails to submit form with lengthy order reference  (5k Characters)", async function () {
    const contact = browser.page.contact();

    const contactUsFormData: ContactUsForm = {
      subjectHeading: "Webmaster",
      email: validEmail,
      orderReference: longText,
      attachFile: imagePath,
      message: shortText,
    };

    await contact.chooseSubjectHeading(contactUsFormData.subjectHeading);
    await contact.assertSubjectHeading(contactUsFormData.subjectHeading);

    await contact.populateEmail(contactUsFormData.email);
    await contact.assertEmail(contactUsFormData.email);

    await contact.populateOrderReference(contactUsFormData.orderReference);
    await contact.assertOrderReference(contactUsFormData.orderReference);

    await contact.populateMessage(contactUsFormData.message);
    await contact.assertMessage(contactUsFormData.message);

    await contact.submitContactForm();

    await contact.assertFailure();
  });

  it("Fails to Submit form with no data", async function () {
    const contact = browser.page.contact();
    await contact.submitContactForm();
    await contact.assertFailure();
  });

  it("Fails to Submit form with empty message and empty subject header", async function () {
    const contact = browser.page.contact();
    const contactUsFormData: ContactUsForm = {
      subjectHeading: "Webmaster",
      email: validEmail,
      orderReference: shortText,
      attachFile: imagePath,
      message: shortText,
    };

    await contact.populateEmail(contactUsFormData.email);
    await contact.assertEmail(contactUsFormData.email);

    await contact.submitContactForm();

    await contact.assertFailure();
  });

  it("Shows correct error messages on failure to submit (empty subject header)", async function () {
    const contact = browser.page.contact();
    const contactUsFormData: ContactUsForm = {
      subjectHeading: "Customer Service",
      email: validEmail,
      orderReference: shortText,
      attachFile: imagePath,
      message: shortText,
    };
    await contact.populateEmail(contactUsFormData.email);
    await contact.assertEmail(contactUsFormData.email);

    await contact.populateMessage(contactUsFormData.message);
    await contact.assertMessage(contactUsFormData.message);

    await contact.submitContactForm();

    await contact.assertFailure();

    // Check that an error related to empty subject header is displayed
    var errorsToLookFor = ["subject"];
    const errors = await contact.getErrors();
    await contact.assertNumberOfErrors(errorsToLookFor, errors);
  });

  it("Shows correct error messages on failure to submit (empty email)", async function () {
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

    await contact.populateMessage(contactUsFormData.message);
    await contact.assertMessage(contactUsFormData.message);

    await contact.submitContactForm();

    await contact.assertFailure();

    // Check that an error related to empty email is displayed
    var errorsToLookFor = ["email"];
    const errors = await contact.getErrors();
    await contact.assertNumberOfErrors(errorsToLookFor, errors);
  });

  it("Shows correct error messages on failure to submit (empty message)", async function () {
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

    await contact.submitContactForm();

    await contact.assertFailure();

    // Check that an error related to empty message is displayed
    var errorsToLookFor = ["message"];
    const errors = await contact.getErrors();
    await contact.assertNumberOfErrors(errorsToLookFor, errors);
  });

  it("Shows correct error messages on failure to submit (empty message and email)", async function () {
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

    await contact.submitContactForm();

    await contact.assertFailure();

    // Check that errors related to empty message and email are displayed
    var errorsToLookFor = ["message", "email"];
    const errors = await contact.getErrors();
    await contact.assertNumberOfErrors(errorsToLookFor, errors);
  });

  it("Shows correct error messages on failure to submit (empty message and subject)", async function () {
    const contact = browser.page.contact();
    const contactUsFormData: ContactUsForm = {
      subjectHeading: "Webmaster",
      email: validEmail,
      orderReference: shortText,
      attachFile: imagePath,
      message: shortText,
    };
    await contact.populateEmail(contactUsFormData.email);
    await contact.assertEmail(contactUsFormData.email);

    await contact.submitContactForm();

    await contact.assertFailure();

    // Check that errors related to empty message and subject header are displayed
    var errorsToLookFor = ["message", "subject"];
    const errors = await contact.getErrors();
    await contact.assertNumberOfErrors(errorsToLookFor, errors);
  });

  it("Shows correct error messages on failure to submit (empty email and subject)", async function () {
    const contact = browser.page.contact();
    const contactUsFormData: ContactUsForm = {
      subjectHeading: "Webmaster",
      email: validEmail,
      orderReference: shortText,
      attachFile: imagePath,
      message: shortText,
    };

    await contact.populateMessage(contactUsFormData.message);
    await contact.assertMessage(contactUsFormData.message);

    await contact.submitContactForm();

    await contact.assertFailure();

    // Check that errors related to empty message and subject header are displayed
    var errorsToLookFor = ["email", "subject"];
    const errors = await contact.getErrors();
    await contact.assertNumberOfErrors(errorsToLookFor, errors);
  });
});

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

  it("Fails to Submit form with valid Data (Missing email field)", async function () {
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

    await contact.populateMessage(contactUsFormData.message);
    await contact.assertMessage(contactUsFormData.message);

    await contact.submitContactForm();

    await contact.assertFailure();
  });

  it("Fails to Submit form with valid Data (Missing header field)", async function () {
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

    await contact.populateMessage(contactUsFormData.message);
    await contact.assertMessage(contactUsFormData.message);

    await contact.submitContactForm();

    await contact.assertFailure();
  });

  it("Fails to Submit form with valid Data (Missing message field)", async function () {
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
  });

  it("Fails to submit form with extremely long messages (Mandatory fields)", async function () {
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

  it("Fails to submit form with extremely long reference number (Mandatory fields)", async function () {
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

    await contact.populateMessage(contactUsFormData.message);
    await contact.assertMessage(contactUsFormData.message);

    await contact.submitContactForm();

    await contact.assertFailure();
  });

  it("Fails to Submit form with valid Data (Missing message and heading field)", async function () {
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

  it("Shows correct error messages on failure to submit (Missing subject header)", async function () {
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

    await contact.populateMessage(contactUsFormData.message);
    await contact.assertMessage(contactUsFormData.message);

    await contact.submitContactForm();

    await contact.assertFailure();

    // Check that errors related to missing subject header show
    var errorsToLookFor = ["subject"];
    const errors = await contact.getErrors();
    await contact.assertNumberOfErrors(errorsToLookFor, errors);
  });

  it("Shows correct error messages on failure to submit (Missing email)", async function () {
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

    await contact.populateMessage(contactUsFormData.message);
    await contact.assertMessage(contactUsFormData.message);

    await contact.submitContactForm();

    await contact.assertFailure();

    // Check that errors related to missing email show
    var errorsToLookFor = ["email"];
    const errors = await contact.getErrors();
    await contact.assertNumberOfErrors(errorsToLookFor, errors);
  });

  it("Shows correct error messages on failure to submit (Missing message)", async function () {
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

    // Check that errors related to missing message show
    var errorsToLookFor = ["message"];
    const errors = await contact.getErrors();
    await contact.assertNumberOfErrors(errorsToLookFor, errors);
  });

  it("Shows correct error messages on failure to submit (Missing message and email)", async function () {
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

    // Check that errors related to missing message and email show
    var errorsToLookFor = ["message", "email"];
    const errors = await contact.getErrors();
    await contact.assertNumberOfErrors(errorsToLookFor, errors);
  });

  it("Shows correct error messages on failure to submit (Missing message and subject)", async function () {
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

    // Check that errors related to missing message and subject heading show
    var errorsToLookFor = ["message", "subject"];
    const errors = await contact.getErrors();
    await contact.assertNumberOfErrors(errorsToLookFor, errors);
  });
});

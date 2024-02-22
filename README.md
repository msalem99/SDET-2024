# SDET-2024

The Project is split into 2 parts:

#### UI: A [website](http://automationpractice.multiformis.com/) Contact page and search page were tested using

- [NightwatchJS](https://nightwatchjs.org/)

#### API : A [mock-user-auth](https://github.com/thiagoluiznunes/mock-user-auth) API that uses JWT tokens is tested using

- [Supertest](https://github.com/ladjs/supertest)
- [Jest](https://github.com/jestjs/jest) as a test runner
- [Jest-html-reporters](https://github.com/Hazyzh/jest-html-reporters) for html report generation

## The root folder contains the following:

- API: A folder containing all what is related to the API tests
- UI: A folder containing all what is related to the UI tests
- API_generated_report: A folder containing the auto generated API test report
- UI_generated_report: A folder containing the auto generated UI test report
- UI_Test_Cases: An excel file containing the UI testcases documentation
- UI_Bug_report: A pdf file containing the bugs found in the UI
- API_Bug_report: A pdf file containing the bugs found in the API
- .circleci: The file containg the configuration for the pipeline that runs the API and UI tests

## UI

The UI tests were done using the [NightwatchJS](https://nightwatchjs.org/) framework by utilizing their [Page objects API](https://nightwatchjs.org/api/pageobject/index.html). the [nightwatch/pages/](https://github.com/msalem99/SDET-2024/tree/main/UI/nightwatch/pages) directory contains the object model for the pages. This object contains all the data needed to test this page and also helper functions were added to reuse in the test scripts. They were named "commands". Typescript was used for a better structure and intellisense. the [tests/](https://github.com/msalem99/SDET-2024/tree/main/UI/test) directory contains the actual test scripts that utilize the object models and their functions to perform certain tests. This piece of [documentation](<https://github.com/nightwatchjs/nightwatch/wiki/Page-objects-with-Nightwatch-v3-(TypeScript)>) was used to use the page objects api with typescript.

To install the packages needed for the UI tests:

```bash
cd UI
npm install
```

To run all the tests:

```bash
npm run test
```

Or if you want to run them headless:

```bash
npm run testHeadless
```

Or to run specific test file:

```bash
npm run testContactPage
```

Or

```bash
npm run testSearchPage
```

The automated report is configured to be saved in the folder named [UI_generated_report](https://github.com/msalem99/SDET-2024/tree/main/UI_generated_report/nightwatch-html-report) in the root of the repo.

## API

The API tests were done using [supertest](https://github.com/ladjs/supertest) and [Jest](https://github.com/jestjs/jest) as a test runner, it tests the [mock-user-auth](https://github.com/thiagoluiznunes/mock-user-auth) api which is an authentication API that uses JWT tokens. The API was installed as a package and then the server was imported from the package and used with supertest to initiate the tests. All the tests reside in the [api.test.js](https://github.com/msalem99/SDET-2024/blob/main/API/api.test.js) file. the [api_endpoints..js](https://github.com/msalem99/SDET-2024/blob/main/API/api_endpoints.js) file is a file containing the requests to the endpoints done using supertest to be imported and reused in the test scripts. The automated report is configured to be saved in the folder named [API_generated_report](https://github.com/msalem99/SDET-2024/tree/main/API_generated_report) in the root of the repo.

To install the packages needed for the API tests:

```bash
cd API
npm install
```

To run all the tests:

```bash
npm run test
```

## CircleCI

Circleci was used for continous integration where two jobs are ran, one for the UI and one for the API tests. The tests were ran locally on OS Ubuntu 22.04.2 and on chrome Version 118.0.5993.88, this same version was used in the CI to ensure same test reports and results.

Refer to the artifacts in the CI for the auto generated reports.

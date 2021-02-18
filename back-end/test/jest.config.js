module.exports = {
  testTimeout: 8000,
  verbose: true,
  reporters: [
    "default",
    "jest-standard-reporter",
    [
      "jest-html-reporter",
      {
        pageTitle: "Backend test suite",
        outputPath: "test-report/index.html",
        includeFailureMsg: true,
      },
    ],
  ],
};

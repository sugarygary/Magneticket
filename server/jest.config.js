module.exports = {
  verbose: true,
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        outputPath: `./reports/unit-test-report-${new Date().getTime()}.html`,
        pageTitle: "Automation Test",
        includeFailureMsg: true,
      },
    ],
  ],
};

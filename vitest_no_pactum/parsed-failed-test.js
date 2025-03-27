// const fs = require('fs');
import fs from 'fs';

// const xml2js = require('xml2js');
import xml2js from 'xml2js';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node parse-junit-failed-tests.js <path-to-junit-xml>');
  process.exit(1);
}

const parser = new xml2js.Parser();

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error('Error reading XML file:', err);
    process.exit(1);
  }

  parser.parseString(data, (err, result) => {
    if (err) {
      console.error('Error parsing XML:', err);
      process.exit(1);
    }

    const failedFilesSet = new Set();

    const testsuites = result.testsuites ? result.testsuites.testsuite : [];
    // console.log("testsuites");
    // console.log(testsuites);
    testsuites.forEach((suite) => {
      const testcases = suite.testcase || [];

      testcases.forEach((testcase) => {
        // console.log(testcase);
        if (testcase.failure || testcase.error) {
          const fileName = testcase.$.classname;

          if (fileName) {
            failedFilesSet.add(fileName);
          }
        }
      });
    });
    // console.log("failedFilesSet");
    // console.log(failedFilesSet);

    const failedFilesList = Array.from(failedFilesSet);

    if (failedFilesList.length === 0) {
      console.log(''); // No failed tests
    } else {
      console.log(failedFilesList.join(' '));
    }
  });
});
 
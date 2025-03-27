import fs from 'fs';
import xml2js from 'xml2js';

export class Rerun {

    /**
    * Get Failed Test File Names
    * @param {string} filePath optional - file path of juni xml. like 'reports/report.xml'
    * @returns {string} list of test file names if exists
    */
    static getFailedTestFileNames (filePath = 'reports/report.xml') {
        let returnString = "not.processed.yet.js";
        try {
            // Read the file synchronously
            const data = fs.readFileSync(filePath, 'utf8');
    
            // Initialize the XML parser
            const parser = new xml2js.Parser();
    
            // Parse the XML data synchronously
            parser.parseString(data, (err, result) => {
                if (err) {
                    console.error('Error parsing XML:', err);
                    process.exit(1);
                }
    
                const failedFilesSet = new Set();
    
                const testsuites = result.testsuites ? result.testsuites.testsuite : [];
                // console.log("testsuites");
                // console.log(testsuites);
    
                if (typeof testsuites === "undefined") {
                    return 'no.testsuites.in.xml.js'; // No failed tests
                } else {
                    testsuites.forEach((suite) => {
                        const testcases = suite.testcase || [];
    
                        testcases.forEach((testcase) => {
                            if (testcase.failure || testcase.error) {
                                const fileName = testcase.$.classname;
                                if (fileName) {
                                    failedFilesSet.add(fileName);
                                }
                            }
                        });
                    });
    
                    const failedFilesList = Array.from(failedFilesSet);
                    if (failedFilesList.length === 0) {
                        returnString = 'no.failed.file.exists.js'; // No failed tests
                    } else {
                        returnString = failedFilesList.join(' ');
                    }
                }
            });
    
        } catch (err) {
            console.error('Error reading XML file:', err);
            process.exit(1);
        }
        return returnString;
    }

    /**
    * Get Failed Test File Names In Console
    * @param {string} filePath optional - file path of juni xml. like 'reports/report.xml'
    */
    static getFailedTestFileNamesInConsole(filePath = 'reports/report.xml') {
        console.log(Rerun.getFailedTestFileNames(filePath));
    };

    /**
    * Get Failed Test File Names In File
    * @param {inFilePath} inFilePath - input file path of juni xml. like 'reports/report.xml'
    * @param {outFilePath} outFilePath - output file path of rerun.txt like 'rerun.txt'
    */
    static getFailedTestFileNamesInFile(inFilePath = 'reports/report.xml', outFilePath = 'rerun.txt') {
        const fileList = Rerun.getFailedTestFileNames(inFilePath);
        try {
            fs.writeFileSync(outFilePath, fileList, 'utf8');
            console.log('File has been written successfully.');
        } catch (err) {
            console.error('Error writing to file:', err);
        }
    };
}

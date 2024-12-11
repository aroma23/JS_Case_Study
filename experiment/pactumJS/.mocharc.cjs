module.exports = {
    timeout: 10000, // set the default timeout for test cases (milliseconds)
    spec: ['test/*.js'], // specify the location of the test file
    // reporter: 'mochawesome', // Use mochawesome as the test report generator
    // 'reporter-option': [
    //     'reportDir=report', // Report directory
    //     'reportFilename=[status]_[datetime]_[name]_report', //Report file name
    //     'html=true', // enable html report
    //     'json=false', // disable json report
    //     'overwrite=false', // disable report file overwrite
    //     'timestamp=longDate', // add timestamp to report file name

    // ], // mochawesome report generator options
}

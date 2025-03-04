import { defineConfig } from 'vitest/config';
import RPReporter from '@reportportal/agent-js-vitest'; // or import { RPReporter } from '@reportportal/agent-js-vitest';

const rpConfig = {
  //pass report portal api from envuironment variables
  // like RP_API_KEY=vitest-demo_api_key npx vitest run test/npm.users.test.js
  apiKey: process.env.RP_API_KEY,
  endpoint: 'https://demo.reportportal.io/api/v1',
  project: 'aroma23_personal',
  launch: 'Vitest with pactum clients',
  attributes: [
    {
      key: 'ENV',
      value: 'UAT',
    }
  ],
  description: 'Vitest results to report portal',
};

export default defineConfig({
  test: {
    // add setup file to be able to use ReportingApi via `this.ReportingApi` in your tests
    setupFiles: ["@reportportal/agent-js-vitest/setup"],
    reporters: ['html', 'verbose', 'json', 'junit', new RPReporter(rpConfig)],
    outputFile: {
      html: './reports/html/index.html',
      json: './reports/report.json',
      junit: './reports/report.xml'
    }, // Specify the output file path    
  },
});
import { defineConfig } from 'vitest/config';
import RPReporter from '@reportportal/agent-js-vitest'; // or import { RPReporter } from '@reportportal/agent-js-vitest';

const rpConfig = {
  apiKey: '<<API_KEY>>',
  endpoint: 'https://demo.reportportal.io/api/v1',
  project: 'aroma23_personal',
  launch: 'Vitest with pactum clients',
  attributes: [
    {
      key: 'key',
      value: 'value',
    },
    {
      value: 'value',
    },
  ],
  description: 'Your launch description',
};

export default defineConfig({
  test: {
    // add setup file to be able to use ReportingApi via `this.ReportingApi` in your tests
    setupFiles: ["@reportportal/agent-js-vitest/setup"],
    reporters: ['default', new RPReporter(rpConfig)],
    reporters: ['html', 'verbose', 'json', 'junit', new RPReporter(rpConfig)],
    outputFile: {
      html: './reports/html/index.html',
      json: './reports/report.json',
      junit: './reports/report.xml'
    }, // Specify the output file path    
  },
});
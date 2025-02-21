import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['html', 'verbose', 'json', 'junit'],
    outputFile: {
      html: './reports/html/index.html',
      json: './reports/report.json',
      junit: './reports/report.xml'
    }, // Specify the output file path
  },
});
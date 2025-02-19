import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['html', 'verbose'],
    outputFile: { html: './reports/html/index.html' }, // Specify the output file path
  },
});
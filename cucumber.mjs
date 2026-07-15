export default {
  paths: ['features/**/*.feature'],
  import: ['features/support/steps.ts'],
  format: [
    'progress',
    ['junit', 'reports/junit.xml'],
    ['html', 'reports/bdd.html'],
    ['@fabricorg/databricks-bdd/evidence-formatter', 'reports/evidence.json'],
  ],
};

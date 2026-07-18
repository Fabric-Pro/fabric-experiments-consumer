process.env.DBX_TEST_PROFILE ??= 'local';

export default {
  paths: ['features/**/*.feature'],
  import: ['cucumber-register.mjs'],
  format: [
    'progress',
    ['junit', 'reports/junit.xml'],
    ['html', 'reports/bdd.html'],
    ['@fabricorg/databricks-bdd/evidence-formatter', 'reports/evidence.json'],
  ],
};

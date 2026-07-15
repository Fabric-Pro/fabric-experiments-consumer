# Fabric Experiments published-package certification

This repository is deliberately outside the Fabric Experiments monorepo. Its CI installs the
public npm releases of `@fabricorg/databricks-testkit` and `@fabricorg/databricks-bdd`, executes a
real Cucumber feature against DuckDB, and uploads JUnit, HTML, and evidence JSON reports.

It guards against workspace-only dependencies, missing package exports, broken peer dependency
declarations, and release artifacts that differ from the source tree.

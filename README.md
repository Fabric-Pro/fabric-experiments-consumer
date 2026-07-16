# Fabric Experiments BDD consumer example

This is the smallest public, runnable example of Fabric Experiments BDD. It
installs the published npm packages—not workspace source—and executes a real
Cucumber feature against local DuckDB. No Databricks account, Python, JVM,
Docker, or Fabric server is required.

## Run it

Prerequisites: Node.js 22 or newer and Corepack.

```bash
git clone https://github.com/Fabric-Pro/fabric-experiments-consumer.git
cd fabric-experiments-consumer
corepack enable
pnpm install --frozen-lockfile
pnpm test
```

The run seeds an `experiment_results` table, queries it, and checks the expected
rows through the published `@fabricorg/databricks-bdd` step library. A second
scenario proves typed action composition, layered state, cardinality, and
active-capability APIs. The suite also executes the published `fx` binary and
verifies all 14 built-in Databricks target packs are discoverable without
importing workspace source.

## Inspect the example

| File | Purpose |
| --- | --- |
| `features/published-package.feature` | Readable Given/When/Then scenario. |
| `features/support/steps.ts` | Registers Fabric and demonstrates typed actions, layered state, and cardinality. |
| `cucumber.mjs` | Feature discovery and JUnit, HTML, and Fabric evidence formatters. |
| `package.json` | Exact public package versions used by the certification gate. |
| `scripts/target-packs.mjs` | Clean-consumer assertion for the published `fx targets` registry. |

After the run, open `reports/bdd.html`. CI also retains:

- `reports/junit.xml` for test annotations;
- `reports/bdd.html` for human review;
- `reports/evidence.json` for structured, secret-redacted evidence.

Try changing the expected treatment conversions from `18` to `19`. The failed
scenario demonstrates report generation and structured failure evidence. Put it
back to `18` before committing.

## Move from local DuckDB to Databricks

The same feature can use the live profile after you configure a SQL warehouse,
an isolated scratch catalog/schema, and OAuth or a short-lived local PAT:

```bash
export DATABRICKS_HOST=https://<your-workspace-host>
export DATABRICKS_HTTP_PATH=/sql/1.0/warehouses/<warehouse-id>
export DATABRICKS_CLIENT_ID=<service-principal-application-id>
export DATABRICKS_CLIENT_SECRET=<service-principal-secret>
export DBX_TEST_CATALOG=fx_test
export DBX_TEST_SCHEMA=consumer_example
export DBX_TEST_PROFILE=live
export DBX_TEST_LIVE=1

pnpm test
```

Use a scratch schema owned by the test identity. The identity needs workspace
access, `CAN USE` on the warehouse, `USE CATALOG`, and fixture read/write access
to the schema.

## Continue learning

- [Ten-minute BDD quickstart](https://experiments.fabric.pro/docs/testing/quickstart/)
- [Behavior-driven testing guide](https://experiments.fabric.pro/docs/testing/bdd/)
- [Complete step catalog](https://experiments.fabric.pro/docs/testing/steps-catalog/)
- [Advanced Databricks BDD](https://experiments.fabric.pro/docs/testing/advanced/)
- [Databricks target packs](https://experiments.fabric.pro/docs/testing/target-packs/)
- [Move from Behave](https://experiments.fabric.pro/docs/migration/behave/)
- [Compatibility matrix](https://experiments.fabric.pro/docs/migration/compatibility/)

## Why this repository exists

It is deliberately outside the Fabric Experiments monorepo. Its CI catches
workspace-only dependencies, missing package exports, peer-dependency mistakes,
and published tarballs that differ from source builds.

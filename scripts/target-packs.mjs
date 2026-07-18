import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const packageJson = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);
const expectedCliVersion = packageJson.devDependencies['@fabricorg/experiments'];
const fxEntrypoint = fileURLToPath(
  new URL('../node_modules/@fabricorg/experiments/dist/bin/fx.js', import.meta.url),
);
const runFx = (args) =>
  execFileSync(process.execPath, [fxEntrypoint, ...args], { encoding: 'utf8' });
const actualCliVersion = runFx(['--version']).trim();
if (actualCliVersion !== `fx ${expectedCliVersion}`) {
  throw new Error(`Expected fx ${expectedCliVersion}, received '${actualCliVersion}'`);
}

const output = runFx(['targets', 'list', '--json']);
const parsed = JSON.parse(output);
const ids = new Set(parsed.packs?.map((pack) => pack.id));
const expected = [
  'sql-delta',
  'lakeflow-ingestion',
  'jobs-code',
  'unity-storage',
  'apps-operational',
  'lakeflow-jobs',
  'streaming-cdc-connect',
  'aibi-genie',
  'mlflow-lifecycle',
  'feature-engineering-serving',
  'model-serving-gateway',
  'vector-rag-agents',
  'federation-sharing-cleanrooms',
  'security-cost-dr',
];

for (const id of expected) {
  if (!ids.has(id)) throw new Error(`Published CLI is missing target pack '${id}'`);
}
if (parsed.packs.length !== expected.length) {
  throw new Error(`Expected ${expected.length} target packs, received ${parsed.packs.length}`);
}

console.log(`Verified ${expected.length} published target packs through ${actualCliVersion}`);

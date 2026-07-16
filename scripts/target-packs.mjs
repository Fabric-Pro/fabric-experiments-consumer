import { execFileSync } from 'node:child_process';

const output = execFileSync('fx', ['targets', 'list', '--json'], {
  encoding: 'utf8',
});
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

console.log(`Verified ${expected.length} published target packs through fx 0.10.0`);

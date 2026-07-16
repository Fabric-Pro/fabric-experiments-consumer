import assert from 'node:assert/strict';
import { Given, Then, When } from '@cucumber/cucumber';
import {
  defineAction,
  parseCardinalityField,
  type DatabricksWorld,
} from '@fabricorg/databricks-bdd';
import '@fabricorg/databricks-bdd/steps';

const rememberColumns = defineAction<[string], string[]>((world, raw) => {
  const columns = parseCardinalityField(raw, '+', String, { fieldName: 'columns' });
  world.setState('scenario', 'columns', columns);
  return columns;
});

Given('TypeScript run and feature state', function (this: DatabricksWorld) {
  this.setState('run', 'language', 'typescript');
  this.setState('feature', 'policy', 'strict');
});

When('I remember columns {string}', function (this: DatabricksWorld, columns: string) {
  return this.runAction(rememberColumns, columns);
});

Then('the layered state contains {string}', function (this: DatabricksWorld, columns: string) {
  assert.equal(this.requireState('language'), 'typescript');
  assert.equal(this.requireState('policy'), 'strict');
  assert.deepEqual(this.requireState('columns'), parseCardinalityField(columns, '+', String));
});

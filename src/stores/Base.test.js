// Dependencies
import test from 'ava';

// Test subject
import { BaseStore, BaseModel } from './Base';

test('_load()', t => {
  const store = new BaseStore();

  // Cache is empty
  t.is(store._cache[5], undefined);
  t.is(store._cache[6], undefined);

  // Create two different instance
  const instanceA = store._load(5);
  const instanceB = store._load(6);
  t.not(store._cache[5], undefined);
  t.not(store._cache[6], undefined);
  t.not(instanceA, instanceB);

  // Cache returns the exact instance
  t.is(store._cache[5], instanceA);
  t.is(store._cache[6], instanceB);
});

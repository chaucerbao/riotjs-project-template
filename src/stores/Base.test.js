// Dependencies
import test from 'ava';
import nock from 'nock';
import fetch from 'node-fetch';

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

test('_fetch()', async t => {
  const store = new BaseStore(fetch);
  const http = nock('http://example.com').get('/').reply(200, {
    id: 8,
    name: 'Sample response'
  });

  const responseBody = await store._fetch('http://example.com/');

  // The HTTP call was made
  t.is(http.isDone(), true);

  // The response is returned
  t.deepEqual(responseBody, { id: 8, name: 'Sample response' });
});

test.afterEach(t => {
  nock.cleanAll();
});

test.after(t => {
  nock.restore();
});

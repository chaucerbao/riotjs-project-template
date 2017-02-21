// Dependencies
import test from 'ava';
import nock from 'nock';
import fetch from 'node-fetch';

// Test subject
import { BaseStore, BaseModel } from './Base';

let store;

// Setup and teardown
test.beforeEach(t => {
  store = new BaseStore(fetch);
});

test.afterEach(t => {
  nock.cleanAll();
});

test.after(t => {
  nock.restore();
});

// Tests
test('_load() returns the same instances from cache', t => {
  // Cache is empty
  t.is(store._cache[5], undefined);
  t.is(store._cache[6], undefined);

  // Create two different instances
  const instanceA = store._load(5);
  const instanceB = store._load(6);
  t.not(store._cache[5], undefined);
  t.not(store._cache[6], undefined);
  t.not(instanceA, instanceB);

  // Cache returns the exact instances
  t.is(store._cache[5], instanceA);
  t.is(store._cache[6], instanceB);
});

test('_fetch() makes an HTTP call and returns the response', async t => {
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

test('_fetch() throws when called again during a pending request', async t => {
  const http = nock('http://example.com').get('/').reply(200, {}).persist();

  store._fetch('http://example.com/');

  const err = await t.throws(store._fetch('http://example.com/'));
});

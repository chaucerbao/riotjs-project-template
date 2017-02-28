// Dependencies
import test from 'ava'
import nock from 'nock'
import fetch from 'node-fetch'

// Test subject
import ExampleStore from '../ExampleStore'

let store

// Setup and teardown
test.beforeEach(t => {
  store = new ExampleStore(fetch)
})

test.afterEach(t => {
  nock.cleanAll()
})

test.after(t => {
  nock.restore()
})

// Tests
test(
  'getList() makes an HTTP call and triggers an event with the results',
  async t => {
    const http = nock('https://jsonplaceholder.typicode.com')
      .get('/users')
      .reply(200, [{ id: 2 }, { id: 8 }])

    store.on('list:loaded', items => {
      t.is(items.length, 2)

      // First model
      t.is(items[0].constructor.name, 'ExampleModel')
      t.is(items[0].id, 2)

      // Second model
      t.is(items[1].constructor.name, 'ExampleModel')
      t.is(items[1].id, 8)
    })

    await store.getList()

    // The HTTP call was made
    t.is(http.isDone(), true)
  }
)

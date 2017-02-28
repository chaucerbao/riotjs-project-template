// Dependencies
import test from 'ava'

// Test subject
import { BaseModel } from '../Base'

// Tests
test('_update() only updates existing properties', t => {
  class Model extends BaseModel {
    constructor () {
      super()

      this.a = []
      this.c = ''
      this.e = 0
    }
  }

  const model = new Model()

  model._update({
    a: [7, 9],
    b: true,
    c: 'Text',
    d: 18,
    e: { n: 1, m: 6 }
  })

  // Only existing properties are set
  t.deepEqual(model.a, [7, 9])
  t.is(model.b, undefined)
  t.is(model.c, 'Text')
  t.is(model.d, undefined)
  t.deepEqual(model.e, { n: 1, m: 6 })
})

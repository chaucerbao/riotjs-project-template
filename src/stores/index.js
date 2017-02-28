// Dependencies
import ExampleStore from './ExampleStore'

// Stores
function stores (http) {
  return {
    exampleStore: new ExampleStore(http)
  }
}

export default stores

// Dependencies
import { BaseStore, BaseModel } from './Base'

// Store
class ExampleStore extends BaseStore {
  constructor (http) {
    super(http)

    this._model = ExampleModel
    this.list = []
  }

  // Fetch a list of resources
  async getList () {
    try {
      const items = await super._fetch(
        'https://jsonplaceholder.typicode.com/users'
      )

      this.list = items.map(item => super._load(item.id, item))
      this.trigger('list:loaded', this.list)
    } catch (err) {
      throw err
    }
  }
}

// Model
class ExampleModel extends BaseModel {
  constructor (store) {
    super(store)

    this.id = 0
    this.name = ''
  }
}

export default ExampleStore

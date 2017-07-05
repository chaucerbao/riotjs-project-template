// Dependencies
import { mount } from 'riot'
import route from 'riot-route'

export default mountPoint => {
  const mountPage = async (page, opts = {}) => {
    await import(`./pages/${page}`)
    mount(mountPoint, page, opts)
  }

  route.base('/')

  // Routes
  route('/', () => mountPage('homepage'))
  route('/nested/*-*', (id, title) => mountPage('homepage', { id, title }))

  // Start the router
  route.start(true)
}

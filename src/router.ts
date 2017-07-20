// Dependencies
import { mount } from 'riot'
import route from 'riot-route'

export default (mountPoint: HTMLElement) => {
  const mountPage = async (page: string, opts: object = {}) => {
    await import(`./pages/${page}`)
    mount(mountPoint, page, opts)
  }

  route.base('/')

  // Routes
  route('/', () => mountPage('homepage'))
  route('/nested/*-*', (id: number, title: string) =>
    mountPage('homepage', { id, title })
  )

  // Start the router
  route.start(true)
}

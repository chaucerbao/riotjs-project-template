import riot from 'riot';
import route from 'riot-route';

function router(mountPoint, stores) {
  // Load page asynchronously
  async function load(page, opts = {}) {
    try {
      await import(`./pages/page-${page}/index.tag`);

      riot.mount(
        mountPoint,
        `page-${page}`,
        Object.assign(opts, { stores, route })
      );
    } catch (err) {
      throw err;
    }
  }

  // Pages
  route('/', () => load('homepage'));
  route('*', () => load('not-found'));

  // Start routing
  route.base('/');
  route.start(true);

  return route;
}

export default router;

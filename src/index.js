// Styles
import './styles/index.scss'

// Application dependencies
import stores from './stores'
import router from './router'

// HTTP transport
function http (request) {
  return window.fetch(request)
}

// Start routing
router(document.body, stores(http))

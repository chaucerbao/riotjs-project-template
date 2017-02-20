// Global dependencies
import 'regenerator-runtime/runtime';

// Application dependencies
import stores from './stores';
import router from './router';

// Start routing
router(document.body, stores);

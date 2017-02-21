// Global dependencies
import 'regenerator-runtime/runtime';

// Styles
import './styles/index.scss';

// Application dependencies
import stores from './stores';
import router from './router';

// Start routing
router(document.body, stores);

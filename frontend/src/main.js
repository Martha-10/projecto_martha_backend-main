// frontend/src/main.js

import { router } from './routes/router.js';

// Inicializamos el enrutador cuando la página se carga y cuando la URL cambia.
// Esto permite a la aplicación mostrar la vista correcta en todo momento.
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);
// router.js

/* Importa las funciones de las vistas de tu tienda */
import { showCatalog } from '../views/catalog.js';
import { showProduct } from '../views/product.js';
import { showCart } from '../views/cart.js';
import { showAccount } from '../views/account.js';
import { showLogin } from '../views/login.js';
import { renderNotFound } from '../views/notfound.js';

/* Mapea las rutas con las funciones de las vistas */
const routes = {
    '#/': showLogin,
    '#/product': showProduct,
    '#/cart': showCart,
    '#/account': showAccount,
    '#/catolog': showCatalog,
};

let previousRoute = null;

export function router() {
    const path = location.hash || '#/';

    // Redirigir a login si se intenta acceder a la cuenta sin estar autenticado
    if (path === '#/account' && !isAuthenticated()) {
        window.location.hash = '#/'; // Redirigir a login si no está autenticado
        return; // Detener la ejecución para no cargar la ruta de la cuenta
    }

    const view = routes[path];
    if (view) {
        view();
        previousRoute = path;
    } else {
        renderNotFound(previousRoute);
    }
}

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
    // Aquí iría la lógica real para verificar si el usuario está autenticado
    // Puede ser algo como una verificación de token en localStorage o cookies
    return localStorage.getItem('user') !== null; // Simulación con localStorage
}

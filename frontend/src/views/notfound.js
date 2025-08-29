import { loadDynamicStyle } from "../utils/styleManager.js";   // import function that controls dynamic CSS


export function renderNotFound(previousRoute) {
  const notFoundHTML = `
    <header class="header">
      <nav class="nav">
        <a href="#/" class="nav-brand">sizeUp</a>
        <ul class="nav-menu">
          <li><a href="#/">Catálogo</a></li>
          <li><a href="#/cart">Carrito</a></li>
          <li><a href="#/account">Mi Cuenta</a></li>
        </ul>
      </nav>
    </header>
    
    <div class="container">
      <div class="card">
        <h1>404 - Página no encontrada</h1>
        <p>La página que buscas no existe.</p>
        <a href="#/" class="btn btn-primary">Volver al inicio</a>
      </div>
    </div>
  `;
  
  document.getElementById('app').innerHTML = notFoundHTML;
  
  // Cargar estilos
  loadDynamicStyle('./src/styles/main.css', 'main');
}
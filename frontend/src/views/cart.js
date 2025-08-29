// src/views/cart.js

import { loadDynamicStyle } from "../utils/styleManager.js";
import { initCartEvents } from "../controllers/cartController.js";

export async function showCart() {
  const cartHTML = `
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
      <h1>Carrito de Compras</h1>
      <div id="cart-items" class="card">
        <p>Cargando carrito...</p>
      </div>
    </div>
  `;
  
  document.getElementById('app').innerHTML = cartHTML;
  
  // Cargar estilos
  loadDynamicStyle('./src/styles/main.css', 'main');
  
  // Inicializar eventos
  initCartEvents();
}

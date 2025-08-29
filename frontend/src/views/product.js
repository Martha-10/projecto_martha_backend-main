// src/views/product.js

import { loadDynamicStyle } from "../utils/styleManager.js";

export async function showProduct() {
  const productHTML = `
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
      <h1>Detalle del Producto</h1>
      <div class="card">
        <p>Aquí se mostrará el detalle del producto.</p>
      </div>
    </div>
  `;
  
  document.getElementById('app').innerHTML = productHTML;
  
  // Cargar estilos
  loadDynamicStyle('./src/styles/main.css', 'main');
}

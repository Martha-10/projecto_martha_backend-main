// src/views/catalog.js

import { loadDynamicStyle } from "../utils/styleManager.js";
import { initCatalogEvents } from "../controllers/catalogController.js";

export async function showCatalog() {
  const catalogHTML = `
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
      <h1>Catálogo de Productos</h1>
      <div id="products-grid" class="products-grid">
        <div class="product-card">
          <img src="https://via.placeholder.com/300x200" alt="Producto 1" class="product-image">
          <div class="product-info">
            <h3 class="product-title">Plus Size Floral Dress</h3>
            <p class="product-price">$49.99</p>
            <button class="btn btn-primary" data-product-id="1">Agregar al Carrito</button>
          </div>
        </div>
        <div class="product-card">
          <img src="https://via.placeholder.com/300x200" alt="Producto 2" class="product-image">
          <div class="product-info">
            <h3 class="product-title">Curvy Fit Jeans</h3>
            <p class="product-price">$39.99</p>
            <button class="btn btn-primary" data-product-id="2">Agregar al Carrito</button>
          </div>
        </div>
        <div class="product-card">
          <img src="https://via.placeholder.com/300x200" alt="Producto 3" class="product-image">
          <div class="product-info">
            <h3 class="product-title">Oversized T-Shirt</h3>
            <p class="product-price">$19.99</p>
            <button class="btn btn-primary" data-product-id="3">Agregar al Carrito</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('app').innerHTML = catalogHTML;
  
  // Cargar estilos
  loadDynamicStyle('./src/styles/main.css', 'main');
  
  // Inicializar eventos
  initCatalogEvents();
}

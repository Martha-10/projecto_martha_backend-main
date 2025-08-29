// src/views/account.js

import { loadDynamicStyle } from "../utils/styleManager.js";
import { initAccountEvents } from "../controllers/accountController.js";

export async function showAccount() {
  const userData = localStorage.getItem('user');

  if (!userData) {
  // No hay usuario, redirige al login o muestra mensaje
  window.location.hash = '#/login';
  return;
}

  const user = userData ? JSON.parse(userData) : null;
  const accountHTML = `
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
      <h1>Mi Cuenta</h1>
      <div class="card">
        <h2>Información Personal</h2>
        <p><strong>Nombre:</strong> ${user ? user.name : 'No disponible'}</p>
        <p><strong>Email:</strong> ${user ? user.email : 'No disponible'}</p>
        <button id="logout-btn" class="btn btn-secondary">Cerrar Sesión</button>
      </div>
    </div>
  `;
  
  document.getElementById('app').innerHTML = accountHTML;
  
  // Cargar estilos
  loadDynamicStyle('./src/styles/main.css', 'main');
  
  // Inicializar eventos
  initAccountEvents();
}

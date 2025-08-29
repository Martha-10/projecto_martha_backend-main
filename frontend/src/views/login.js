// frontend/src/views/login.js

import { loadDynamicStyle } from "../utils/styleManager.js";
import { initLoginEvents } from "../controllers/loginController.js";

export async function showLogin() {
    document.getElementById('app').innerHTML = `
        <div class="login-container">
            <form id="form-login" class="login-form card">
                <h2>Inicio de Sesión</h2>
                <input type="email" id="email" placeholder="Correo electrónico" required>
                <input type="password" id="password" placeholder="Contraseña" required>
                <button type="submit">Entrar</button>
            </form>
        </div>`;
    
    loadDynamicStyle('./src/styles/login.css', 'login');
    initLoginEvents();
}
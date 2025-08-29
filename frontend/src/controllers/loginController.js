// src/controllers/loginController.js

export function initLoginEvents() {
  const loginForm = document.getElementById('form-login');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
}

async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Llamada al backend para autenticar al usuario
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      // Guardar token y datos del usuario
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(email));
      
      // Mostrar mensaje de éxito
      showMessage('Inicio de sesión exitoso', 'success');
      
      // Redirigir a la cuenta del usuario
      setTimeout(() => {
        window.location.hash = '#/account';
      }, 1000);
    } else {
      showMessage(data.message || 'Error en el inicio de sesión', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage('Error de conexión. Intenta de nuevo.', 'error');
  }
}

function showMessage(message, type) {
  // Remover mensajes anteriores
  const existingMessage = document.querySelector('.message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Crear nuevo mensaje
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;

  // Insertar antes del formulario
  const form = document.getElementById('form-login');
  form.parentNode.insertBefore(messageDiv, form);
}

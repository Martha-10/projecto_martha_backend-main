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
    console.log('Respuesta del servidor:', data);


    if (response.ok && data.token && data.user) {
      const { token, user } = data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); // <- Asegúrate de que `user` es un objeto

      if (user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        console.error('❌ Usuario no definido en la respuesta del backend');
        showMessage('Error en los datos recibidos', 'error');
        return;
      }

      showMessage('Inicio de sesión exitoso', 'success');

      setTimeout(() => {
        window.location.hash = '#/account';
      }, 1000);
    }

    showMessage('Inicio de sesión exitoso', 'success');

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

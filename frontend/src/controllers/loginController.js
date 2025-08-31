async function handleLogin(event) {
  event.preventDefault();

  const form = document.getElementById('form-login');
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  showMessage('Ingresando...', 'info');

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log('Respuesta del servidor:', data);

    if (!response.ok) {
      const msg = data?.message || 'Inicio de sesión fallido';
      showMessage(msg, 'error');
      return;
    }

    if (data.token && data.user) {
      const { token, user } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      showMessage('Inicio de sesión exitoso', 'success');

      setTimeout(() => window.location.hash = '#/account', 1000);
    } else {
      showMessage('Datos incompletos en la respuesta del servidor', 'error');
    }
  } catch (error) {
    console.error('Error en login:', error);
    showMessage('Error conectando al servidor', 'error');
  } finally {
    submitBtn.disabled = false;
  }
}
  
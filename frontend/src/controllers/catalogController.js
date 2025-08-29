// src/controllers/catalogController.js

export function initCatalogEvents() {
  // Agregar event listeners a los botones de "Agregar al Carrito"
  const addToCartButtons = document.querySelectorAll('[data-product-id]');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', handleAddToCart);
  });
}

async function handleAddToCart(event) {
  const productId = event.target.dataset.productId;
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    // Si no hay usuario logueado, redirigir al login
    window.location.hash = '#/login';
    return;
  }
  
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/cart-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: user.id,
        product_id: parseInt(productId),
        quantity: 1
      })
    });
    
    if (response.ok) {
      showMessage('Producto agregado al carrito', 'success');
    } else {
      const data = await response.json();
      showMessage(data.message || 'Error al agregar al carrito', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage('Error de conexión', 'error');
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

  // Insertar al inicio del contenedor
  const container = document.querySelector('.container');
  container.insertBefore(messageDiv, container.firstChild);
  
  // Remover mensaje después de 3 segundos
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 3000);
}
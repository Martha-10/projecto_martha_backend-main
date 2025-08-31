// src/controllers/cartController.js

export async function initCartEvents() {
  await loadCartItems();
  
  // Eventos para el manejo del carrito
  document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('qty-increase')) {
      const itemId = e.target.dataset.itemId;
      await updateCartItemQuantity(itemId, 1);
    }

    if (e.target.classList.contains('qty-decrease')) {
      const itemId = e.target.dataset.itemId;
      await updateCartItemQuantity(itemId, -1);
    }

    if (e.target.classList.contains('remove-item')) {
      const itemId = e.target.dataset.itemId;
      await removeCartItem(itemId);
    }
  });

  // Evento de checkout
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', async () => {
      await processCheckout();
    });
  }
}

async function loadCartItems() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    window.location.hash = '#/';
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000/api/cart-items?user_id=${user.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const cartItems = await response.json();
      renderCartItems(cartItems);
    }
  } catch (error) {
    console.error('Error loading cart:', error);
    showMessage('Error al cargar el carrito', 'error');
  }
}

function renderCartItems(cartItems) {
  const cartContainer = document.getElementById('cart-items');
  
  if (!cartItems || cartItems.length === 0) {
    cartContainer.innerHTML = `
      <p>Tu carrito está vacío.</p>
      <a href="#/" class="btn btn-primary">Continuar Comprando</a>
    `;
    return;
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  cartContainer.innerHTML = `
    <div class="cart-items">
      ${cartItems.map(item => `
        <div class="cart-item">
          <div class="item-info">
            <h3>${item.product_name}</h3>
            <p>$${item.price}</p>
          </div>
          <div class="item-quantity">
            <button class="qty-decrease" data-item-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="qty-increase" data-item-id="${item.id}">+</button>
          </div>
          <button class="remove-item" data-item-id="${item.id}">Eliminar</button>
        </div>
      `).join('')}
    </div>
    <div class="cart-total">
      <h3>Total: $${total.toFixed(2)}</h3>
      <button id="checkout-btn" class="btn btn-primary">Realizar Pedido</button>
    </div>
  `;
}

async function updateCartItemQuantity(itemId, change) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000/api/cart-items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        quantity_change: change
      })
    });

    if (response.ok) {
      await loadCartItems();
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    showMessage('Error al actualizar el carrito', 'error');
  }
}

async function removeCartItem(itemId) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000/api/cart-items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      await loadCartItems();
    }
  } catch (error) {
    console.error('Error removing item:', error);
    showMessage('Error al eliminar el producto', 'error');
  }
}

async function processCheckout() {
  const user = JSON.parse(localStorage.getItem('user'));
  
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: user.id,
        total_amount: calculateTotal(),
        status: 'pending'
      })
    });

    if (response.ok) {
      showMessage('Pedido realizado con éxito', 'success');
      setTimeout(() => {
        window.location.hash = '#/account';
      }, 2000);
    }
  } catch (error) {
    console.error('Error processing checkout:', error);
    showMessage('Error al procesar el pedido', 'error');
  }
}

function calculateTotal() {
  // Esta función debería calcular el total basado en los items del carrito
  // Por ahora retornamos un valor fijo
  return 0;
}

function showMessage(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;

  const container = document.querySelector('.container');
  container.insertBefore(messageDiv, container.firstChild);
  
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 3000);
}
// utilityFunctions.js

export async function getCartItems() {
    const response = await fetch('http://localhost:3000/cart-items?user_id=1'); // TODO: Obtener del auth
    return await response.json();
}

export async function addToCart(productId, variantId = null) {
    try {
        const response = await fetch('http://localhost:3000/cart-items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: 1, // TODO: Get from auth
                product_id: productId,
                variant_id: variantId,
                quantity: 1
            })
        });

        if (response.ok) {
            showNotification('Producto agregado al carrito');
            updateCartCounter();
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}

export async function loadCartItems() {
    const cartItems = await getCartItems();
    renderCartItems(cartItems);
    updateCartCounter();
}

export function renderCartItems(items) {
    const container = document.getElementById('cart-items');
    if (!container) return;
    // ... (El resto de la función renderCartItems del código original)
}

export function calculateTotal(items) {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export async function updateCartCounter() {
    const cartItems = await getCartItems();
    const counter = document.getElementById('cart-counter');
    if (counter) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        counter.textContent = totalItems;
    }
}

export function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
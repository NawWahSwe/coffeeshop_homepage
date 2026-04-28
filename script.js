
// Function to add items to the cart
function addToCart(name, price, img) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, img: img, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + " added to cart!");
}

/* shopping_cart */

function renderCart() {
    const cartList = document.getElementById('cart-list');
    if (!cartList) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartList.innerHTML = '<div style="padding:20px; text-align:center;">Your cart is empty</div>';
        updateSummary(0);
        return;
    }

    cartList.innerHTML = cart.map((item, index) => `
        <div class="cart-item" style="display:flex; align-items:center; padding:15px; border-bottom:1px solid #eee;">
            <img src="image/${item.img}" style="width:70px; height:70px; border-radius:5px; object-fit:cover;">
            <div style="flex-grow:1; padding-left:15px;">
                <h4 style="margin:0;">${item.name}</h4>
                <p style="color:#888; margin:5px 0;">${item.price.toFixed(2)} MMK</p>
            </div>
            <div class="qty-controls">
                <button onclick="changeQty(${index}, -1)">-</button>
                <span style="margin:0 10px;">${item.quantity}</span>
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>
            <button onclick="removeItem(${index})" style="margin-left:20px; background:none; border:none; cursor:pointer;">🗑️</button>
        </div>
    `).join('');

    updateSummary(cart);
}

function updateSummary(cart) {
    const subtotal = cart === 0 ? 0 : cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05; // 5% Tax
    const total = subtotal + tax;

    document.getElementById('subtotal').innerText = `${subtotal.toFixed(2)} MMK`;
    document.getElementById('tax').innerText = `${tax.toFixed(2)} MMK`;
    document.getElementById('total').innerText = `${total.toFixed(2)} MMK`;
}

function changeQty(index, delta) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-list')) {
        renderCart();
    }
    
 //   window.onclick = function(event) {
//      const modal = document.getElementById("detailModal");
 //       if (event.target == modal) {
 //           closeModal();
  //      }
   // }
});


/* Brewing_Equipment */

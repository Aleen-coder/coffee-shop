
import React, { useContext, useState, useEffect } from "react";
import "../styles/Cart.css";
import { CartContext } from "./CartContext";
import api from "../api"; // use our axios instance

function Cart() {
  const { cartItems, setCartItems,  removeFromCart, clearCart, totalPrice } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
    const userId = localStorage.getItem("userId");

useEffect(() => {
   if (userId) 
  {
   
     api.get(`/cart/${userId}`) 
    .then(res => setCartItems(res.data.cartItems || [])) 
    .catch(err => console.error("Failed to fetch cart:", err));
 } 
 else { // clear cart if not logged in
  setCartItems([]); }
}, [userId, setCartItems]);

  const toggleCart = () => setIsOpen(!isOpen);

  const handleCheckout = async () => {
     if (!userId) {
    alert("You should login or register first before checking out.");
    return;
  }
// Asking for confirmation before placing the order
 const confirmed = window.confirm("Do you want to confirm your order?"); 
 if (!confirmed) { 
 alert("Order cancelled.");
return;
 }
    try {
    
        const res = await api.post("/checkout", {
        user_id: userId,
        cartItems: cartItems
      });
      alert("Order placed successfully! Order ID: " + res.data.orderId);
      clearCart(); // empty cart after checkout
    } catch (err) {
      console.error("Checkout failed:", err);
        alert("Checkout failed. Please try again.");
    }
  };



  return (
    <>
      <button className="cart-toggle-btn" onClick={toggleCart}>
        🛒 Cart ({cartItems.length})
      </button>

      <div className={`cart-side-panel ${isOpen ? "open" : ""}`}>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-items">
              {cartItems.map((item) => (
  
                  <li key={item.id} className="cart-item">
                  <img
               src={`http://localhost:5000/${item.image_url}`}
               alt={item.name}
              className="cart-item-img"
/>

         
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ${item.price * item.quantity}</p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-footer">
              <h3>Total: ${totalPrice.toFixed(2)}</h3>
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;

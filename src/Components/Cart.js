import React, { useContext, useState } from "react";
import "../styles/Cart.css";
import { CartContext } from "./CartContext";
import axios from "axios";

function Cart() {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const userId = 1; // temporary hardcoded user ID
  const toggleCart = () => setIsOpen(!isOpen);
  const handleCheckout = async () => {
    try {
      const res = await axios.post("http://localhost:5000/checkout", {
        user_id: userId,
        cartItems: cartItems
      });
      alert("Order placed successfully! Order ID: " + res.data.orderId);
      clearCart(); // empty cart after checkout
    } catch (err) {
      console.error("Checkout failed:", err);
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
                  <img src={item.image_url} alt={item.name} className="cart-item-img" />
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

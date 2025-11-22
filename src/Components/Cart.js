import React, { useContext, useState } from "react";
import "../styles/Cart.css";
import { CartContext } from "./CartContext";

function Cart() {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

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
                <li key={item.name} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ${item.price * item.quantity}</p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.name)}
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
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;

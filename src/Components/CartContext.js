/*CartContext → stores the items, handles quantity, removal, total price. */

import React, { createContext, useState, useEffect } from "react";


import axios from "axios";
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // TODO: replace with logged-in user ID
  /*const addToCart = (item) => {
    const existing = cartItems.find((i) => i.name === item.name);
    if (existing) {
      setCartItems(
        cartItems.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };*/
    // Load cart from backend when component mounts
    useEffect(() => {
      const fetchCart = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/cart/${userId}`);
          setCartItems(res.data);
        } catch (err) {
          console.error("Error loading cart:", err);
        }
      };
      fetchCart();
    }, []);

  // Add item to cart
  const addToCart = async (item) => {
    await axios.post("http://localhost:5000/cart", {
      user_id: userId,
      product_id: item.id,
      quantity: 1
    });
     // refresh cart
    const res = await axios.get(`http://localhost:5000/cart/${userId}`);
    setCartItems(res.data);
  };



  /*const removeFromCart = (itemName) => {
    setCartItems(cartItems.filter((i) => i.name !== itemName));
  };*/

    // Remove item from cart
  const removeFromCart = async (cartItemId) => {
    await axios.delete(`http://localhost:5000/cart/${cartItemId}`);
    setCartItems(cartItems.filter(i => i.id !== cartItemId));
  };


 /* const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );*/

   const clearCart = async () => {
    // optional: loop through items and delete each
    for (const item of cartItems) {
      await axios.delete(`http://localhost:5000/cart/${item.id}`);
    }
    setCartItems([]);
  };


 
  // Calculate total
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

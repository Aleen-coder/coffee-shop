/*CartContext → stores the items, handles quantity, removal, total price. */

import React, { createContext, useState, useEffect } from "react";
import api from "../api"; // use our axios instance

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // TODO: replace with logged-in user ID

    // Load cart from backend when component mounts
    useEffect(() => {
      const fetchCart = async () => {
        try {
          const res = await api.get(`/cart/${userId}`);
           // backend returns an array directly, not { cartItems: [...] } 
           setCartItems(res.data || []);
        } catch (err) {
          console.error("Error loading cart:", err.response || err.message || err);

        }
      };
      fetchCart();
    }, []);

  // Add item to cart
  const addToCart = async (item) => {
    console.log("Sending to backend:",{
  user_id: userId,
       product_id: item.id,
      quantity: 1,
      name: item.name,
    //  price: item.price, 
     // image_url: item.image_url,
 
    });  
  
await api.post("/cart", { 
  user_id: userId, 
  product_id: item.id, quantity: 1, 
  name: item.name,
  // price: item.price, 
  // image_url: item.image_url, });

  
   // refresh cart
    const res = await api.get(`/cart/${userId}`); 
 // setCartItems(res.data.cartItems || []);
  setCartItems(res.data || []);

  };

     // Remove item from cart 
     const removeFromCart = async (cartItemId) => {
     await api.delete(`/cart/${cartItemId}`);
     setCartItems(cartItems.filter((i) => i.id !== cartItemId));

    };

   // Clear cart
   const clearCart = async () => {
   for (const item of cartItems) {
    await api.delete(`/cart/${item.id}`);
    } 
    setCartItems([]); };


  // Calculate total
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

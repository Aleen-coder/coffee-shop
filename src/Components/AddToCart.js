/*AddToCart button on each coffee card → let the user add items.*/
import React, { useState, useContext } from "react";
import "../styles/AddToCart.css";


import { CartContext } from "./CartContext";

function AddToCart({ coffee }) {
  const { addToCart } = useContext(CartContext);
  const [clicked, setClicked] = useState(false);
  
  const handleClick = () => {
    console.log("Coffee object:", coffee);
    addToCart(coffee);
    setClicked(true);
    setTimeout(() => setClicked(false), 300); // reset after 300ms
  };
 /* return (
    <button className="add-to-cart-btn" onClick={() => addToCart(coffee)}>
      Add to Cart
    </button>
  );*/




    return (
    <button
      className={`add-to-cart-btn ${clicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      {clicked ? "Added!" : "Add to Cart"}
    </button>
  );

}

export default AddToCart;

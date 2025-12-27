
/*CoffeeCard → displays each coffee item with hover animation. */
import React from "react";
import "../styles/CoffeeCard.css"; // make sure you create this CSS file
import AddToCart from "./AddToCart.js";


function CoffeeCard({id, image, name, origin, description, popularity, recommended_serving, price }) {
   // Define the coffee object here
   const coffee = {id, image, name, origin, description, popularity, recommended_serving, price };

  return (
    <div className="coffee-card">
      <img src={image} alt={name} className="coffee-image" />
      <h3 className="coffee-name">{name}</h3>
      <p className="coffee-origin">Origin: {origin}</p>
      <p className="coffee-description">{description}</p>
      <p className="coffee-serving">Serving: {recommended_serving}</p>
      <p className="coffee-popularity">Popularity: {popularity}</p>
      <p className="coffee-price">${price.toFixed(2)}</p>
          {/* Pass the coffee object to AddToCart */}
      <AddToCart coffee={coffee} />
    
    </div>
       
  );
}

export default CoffeeCard;
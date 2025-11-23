
/*maps over the list and passes props to each CoffeeCard */
import "../styles/CoffeeCard.css"; //
import "../styles/CoffeeMenu.css"
import React from "react";
import CoffeeCard from "../Components/CoffeeCard"; 
import { CoffeeList } from "../data/coffeeList"; 
import { PastryList } from "../data/PastryList";
import Cart from "../Components/Cart"; // import the side cart 
function CoffeeMenu() {
  return (
       <section className="coffee-menu">
      <h2 className="menu-title">☕ Our Coffee Menu</h2>
    <div className="menuContainer" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {CoffeeList.map((coffee, index) => (
        <CoffeeCard
          key={index}
          image={coffee.image}
          name={coffee.name}
          origin={coffee.origin}
          description={coffee.description}
          popularity={coffee.popularity}
          recommendedServing={coffee.recommendedServing}
          price={coffee.price}
        />
      ))}
    </div>
      {/* Pastry Section */}
      <h2 className="menu-title">🥐 Fresh Pastries</h2>
      <div className="menuContainer" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
{PastryList.map((pastry,index) => (
  <CoffeeCard
   key={index}
    image={pastry.image}
    name={pastry.name}
    description={pastry.description}
    price={pastry.price}
    origin={pastry.origin}
    popularity={pastry.popularity}
    recommendedServing={pastry.recommendedServing}
  />
  ))}








      </div>
       {/* Side Cart */}
      <Cart />
     </section>
  );
}

export default CoffeeMenu;
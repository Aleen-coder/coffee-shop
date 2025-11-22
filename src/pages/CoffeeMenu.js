
/*maps over the list and passes props to each CoffeeCard */
import "../styles/CoffeeCard.css"; //
import React from "react";
import CoffeeCard from "../Components/CoffeeCard"; // adjust the path
import { CoffeeList } from "../data/coffeeList"; // adjust the path
import { PastryList } from "../data/PastryList"; // ✅ import pastries
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
        {PastryList.map((pastry, index) => (
          <CoffeeCard
            key={index}
            image={pastry.image}
            name={pastry.name}
            description={pastry.description}
            price={pastry.price}
          />
        ))}
      </div>
     </section>
  );
}

export default CoffeeMenu;
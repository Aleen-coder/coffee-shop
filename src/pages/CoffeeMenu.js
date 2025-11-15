import React from "react";
import CoffeeCard from "../Components/CoffeeCard"; // adjust the path
import { CoffeeList } from "../data/coffeeList"; // adjust the path

function CoffeeMenu() {
  return (
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
  );
}

export default CoffeeMenu;
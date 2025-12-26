// pastryList.js

import almondCroissant from "../images/almondCroissant.jpg";
import BlueBerryMuffin from "../images/BlueBerryMuffin.jpg";
import chocolatecroissant from "../images/chocolatecroissant.jpg";
import  CinnamonRoll from "../images/CinnamonRoll.jpg";
import Eclair from "../images/Eclair.jpg";
import MacaronAssortment from "../images/MacaronAssortment.jpg";
import Croissant from "../images/croissant.jpg"; 

export const PastryList = [
  {
    name: "Butter Croissant",
    description: "Flaky, golden pastry baked fresh daily",
    price: 3.0,
    image: Croissant ,  
     origin: "France",
    popularity: "High",
    recommendedServing: "Breakfast"
  },
  {
    name: "Chocolate Croissant",
    description: "Rich chocolate filling inside buttery layers",
    price:3.50,
    image: chocolatecroissant,
     origin: "France",
    popularity: "Very High",
    recommendedServing: "Morning Snack"  
  },
  {
    name: "Almond Croissant",
    description: "Filled with almond cream and topped with sliced almonds",
    price: 3.75,
    image: almondCroissant,
      origin: "France",
    popularity: "Medium",
    recommendedServing: "Breakfast"
  },
  {
    name: "Cinnamon Roll",
    description: "Soft roll swirled with cinnamon sugar and glazed with icing",
    price: 3.25,
    image: CinnamonRoll,
        origin: "USA",
    popularity: "High",
    recommendedServing: "Afternoon Tea"
  },
  {
    name: "Blueberry Muffin",
    description: "Moist muffin bursting with fresh blueberries",
    price: 2.75,
    image: BlueBerryMuffin,
       origin: "USA",
    popularity: "Medium",
    recommendedServing: "Morning Snack"
  },
  {
    name: "Macaron Assortment",
    description: "Delicate French cookies in assorted flavors",
    price: 5.0,
    image: MacaronAssortment,
     origin: "France",
    popularity: "High",
    recommendedServing: "Dessert"
  },
  {
    name: "Éclair",
    description: "Choux pastry filled with cream and topped with chocolate glaze",
    price: 4.0,
    image: Eclair,
    origin: "France",
    popularity: "High",
    recommendedServing: "Dessert"
  }
];

// pastryList.js

import almondCroissant from "../images/almondCroissant.jpg";
import BlueberryMuffin from "../images/BlueberryMuffin.jpg";


import chocolatecroissant from "../images/chocolatecroissant.jpg";
import  CinnamonRoll from "../images/CinnamonRoll.jpg";
import Eclair from "../images/Eclair.jpg";
import MacaronAssortment from "../images/MacaronAssortment.jpg";
import Croissant from "../images/croissant.jpg"; 

export const PastryList = [
  {
    id:9,
    name: "Butter Croissant",
    description: "Flaky, golden pastry baked fresh daily",
    price: 3.0,
    image: Croissant ,  
     origin: "France",
    popularity: "High",
    recommended_serving: "Breakfast"
  },
  {
    id:10,
    name: "Chocolate Croissant",
    description: "Rich chocolate filling inside buttery layers",
    price:3.50,
    image: chocolatecroissant,
     origin: "France",
    popularity: "Very High",
    recommended_serving: "Morning Snack"  
  },
  {
    id:11,
    name: "Almond Croissant",
    description: "Filled with almond cream and topped with sliced almonds",
    price: 3.75,
    image: almondCroissant,
      origin: "France",
    popularity: "Medium",
    recommended_serving: "Breakfast"
  },
  {
    id:12,
    name: "Cinnamon Roll",
    description: "Soft roll swirled with cinnamon sugar and glazed with icing",
    price: 3.25,
    image: CinnamonRoll,
        origin: "USA",
    popularity: "High",
    recommended_serving: "Afternoon Tea"
  },
  {
    id:13,
    name: "Blueberry Muffin",
    description: "Moist muffin bursting with fresh blueberries",
    price: 2.75,
    image: BlueberryMuffin,
       origin: "USA",
    popularity: "Medium",
    recommended_serving: "Morning Snack"
  },
  {
    id:14,
    name: "Macaron Assortment",
    description: "Delicate French cookies in assorted flavors",
    price: 5.0,
    image: MacaronAssortment,
     origin: "France",
    popularity: "High",
    recommended_serving: "Dessert"
  },
  {
    id:15,
    name: "Éclair",
    description: "Choux pastry filled with cream and topped with chocolate glaze",
    price: 4.0,
    image: Eclair,
    origin: "France",
    popularity: "High",
    recommended_serving: "Dessert"
  }
];

// pastryList.js

import almondCroissant from "../images/almondCroissant.jpg";
import BlueberryMuffin from "../images/BlueberryMuffin.jpg";
import chocolatecroissant from "../images/chocolatecroissant.jpg";
import CinnamonRoll from "../images/CinnamonRoll.jpg";
import Eclair from "../images/Eclair.jpg";
import MacaronAssortment from "../images/MacaronAssortment.jpg";
import Croissant from "../images/croissant.jpg"; 

export const PastryList = [
  {
    name: "Butter Croissant",
    description: "Flaky, golden pastry baked fresh daily",
    price: "$3.00",
    image: Croissant   // ✅ use imported variable
  },
  {
    name: "Chocolate Croissant",
    description: "Rich chocolate filling inside buttery layers",
    price: "$3.50",
    image: chocolatecroissant  // ✅ use imported variable
  },
  {
    name: "Almond Croissant",
    description: "Filled with almond cream and topped with sliced almonds",
    price: "$3.75",
    image: almondCroissant
  },
  {
    name: "Cinnamon Roll",
    description: "Soft roll swirled with cinnamon sugar and glazed with icing",
    price: "$3.25",
    image: CinnamonRoll
  },
  {
    name: "Blueberry Muffin",
    description: "Moist muffin bursting with fresh blueberries",
    price: "$2.75",
    image: BlueberryMuffin
  },
  {
    name: "Macaron Assortment",
    description: "Delicate French cookies in assorted flavors",
    price: "$5.00",
    image: MacaronAssortment
  },
  {
    name: "Éclair",
    description: "Choux pastry filled with cream and topped with chocolate glaze",
    price: "$4.00",
    image: Eclair
  }
];

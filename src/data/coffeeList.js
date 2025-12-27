
/*(array of coffee objects). */

import Espresso from "../assets/Espresso.jpg";
import Americano from "../assets/Americano.avif";
import Latte from "../assets/Latte.jpg";
import Cappuccino from "../assets/Cappuccino.jpg";
import Mocha from "../assets/Mocha.png";
import Macchiato from "../assets/Macchiato.jpg";
import FlatWhite from "../assets/FlatWhite.jpg";
import Cortado from "../assets/Cortado.jpg";

export const CoffeeList = [
  {
    id:1,
    name: "Espresso",
    image: Espresso,
    origin: "Italy",
    description:
      "A bold, concentrated shot—pure coffee energy wrapped in a small, elegant moment.",
    popularity: 10,
    recommended_serving: "Single or double shot",
    price: 3.00,
  },

  {
    id:2,
    name: "Americano",
    image: Americano,
    origin: "Italy / USA",
    description:
      "A gentle dilution of espresso that keeps the soul of the bean alive while softening its edges.",
    popularity: 9,
    recommended_serving: "Tall cup, hot",
    price: 3.50,
  },

  {
    id:3,
    name: "Latte",
    image: Latte,
    origin: "Italy",
    description:
      "A smooth harmony of espresso wrapped in warm milk—creamy, calm, and effortlessly comforting.",
    popularity: 10,
    recommended_serving: "Hot, with light foam",
    price: 4.50,
  },

  {
    id:4,
    name: "Cappuccino",
    image: Cappuccino,
    origin: "Italy",
    description:
      "Strong espresso lifted by airy foam—balanced, warm, and beautifully structured.",
    popularity: 9,
    recommended_serving: "Hot, with equal milk and foam",
    price: 4.25,
  },

  {
    id:5,
    name: "Mocha",
    image: Mocha,
    origin: "Yemen",
    description:
      "Espresso touched by chocolate, creating a soft, indulgent hug in a cup.",
    popularity: 10,
    recommended_serving: "Hot, with a swirl of chocolate",
    price: 5.00,
  },

  {
    id:6,
    name: "Macchiato",
    image: Macchiato,
    origin: "Italy",
    description:
      "A sharp espresso softened by just a drop of milk—bold at heart, gentle at the surface.",
    popularity: 8,
    recommended_serving: "Single shot with a stain of milk",
    price: 3.75,
  },

  {
    id:7,
    name: "Flat White",
    image: FlatWhite,
    origin: "Australia / New Zealand",
    description:
      "Silky milk blended seamlessly with espresso—rich, warm, and confidently smooth.",
    popularity: 9,
    recommended_serving: "Hot, with microfoam",
    price: 4.75,
  },

  {
    id:8,
    name: "Cortado",
  image: Cortado,
    origin: "Spain",
    description:
      "Espresso and milk meeting halfway—equal parts strength and softness, perfectly balanced.",
    popularity: 8,
    recommended_serving: "Small glass, warm",
    price: 4.00,
  },
];
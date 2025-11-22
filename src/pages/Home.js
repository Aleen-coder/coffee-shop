import { Link } from "react-router-dom";
import BackgroundChanger from "../Components/BackgroundChanger.js";

// Import images from src/images
import bg1 from "../images/bg1.jpg";
import bg2 from "../images/bg2.jpg";
import bg3 from "../images/bg3.webp";
import bg4 from "../images/bg4.webp";
import bg5 from "../images/bg5.jpg";
import bg6 from "../images/bg6.jpg";
import bg7 from "../images/bg7.jpg";
import bg8 from "../images/bg8.jpg";
import bg10 from "../images/bg10.jpg";


const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8,bg10];

function Home() {
  return (
    <BackgroundChanger images={backgrounds} interval={8000}>
      {/* Transparent Box Overlay */}
      <div className="bg-white/30 backdrop-blur-md rounded-xl p-10 shadow-lg text-center max-w-lg mx-4">
        
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#A67C52] mb-4">
          Welcome to the Coffee Shop ☕
        </h1>

        {/* Subtitle / Quote */}
        <p className="text-lg md:text-xl text-gray-800 mb-6">
          Every cup tells a story. Savor the warmth, taste the greatness.
        </p>

        {/* Button / CTA */}
        <Link
          to="/menu"
          className="bg-[#A67C52] text-white px-6 py-3 rounded-full hover:bg-[#8c6239] transition-colors duration-300"
        >
          Explore Menu
        </Link>
      </div>
    </BackgroundChanger>
  );
}

export default Home;

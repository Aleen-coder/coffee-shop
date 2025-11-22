import { Link } from "react-router-dom";
import BackgroundChanger from "../Components/BackgroundChanger.js";
import "../styles/Home.css"; // ✅ import the CSS file
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
      <div className="home-container">
        <div className="content">
          <div className="intro-text">
            <h1>Welcome to Cafe Savore ☕</h1>
            <p>Every cup tells a story — savor the warmth, taste the greatness.</p>
            <p>Discover our handcrafted coffees, pastries, and cozy atmosphere.</p>
            <p>Relax, connect, and enjoy elegance in every sip.</p>
            <Link to="/menu" className="btn">
              Explore Menu
            </Link>
          </div>
        </div>
      </div> {/* ✅ close home-container */}
    </BackgroundChanger>
  );
}


export default Home;

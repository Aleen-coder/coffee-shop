import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./pages/Home";
import CoffeeMenu from "./pages/CoffeeMenu";
import About from "./pages/About"; // optional
import Contact from "./pages/Contact"; // optional
import img16 from "./assets/img16.jpg";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import { CartProvider } from "./Components/CartContext";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
      <CartProvider>
    <Router>
      <div className="app-container">
        <NavBar />
         <Cart /> {/* <-- always visible toggle cart on all pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<CoffeeMenu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Routes>

        {/* Global Footer */}
         <Footer />
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;

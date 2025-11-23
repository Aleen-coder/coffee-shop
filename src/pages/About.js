import "../styles/About.css";
import Lina from "../assets/Lina.jpg";
import Baker from "../assets/Baker.avif";
import Manager from "../assets/Manager.jpg";
function About() {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">About Café Savore ☕</h1>

        {/* Origin Story */}
        <section className="about-section origin-story">
          <h3>Our Story</h3>
          <p>
            Café Savore began with a single espresso brewed in a small kitchen,
            driven by a passion for bringing people together over coffee. What
            started as a dream quickly grew into a boutique café experience.
          </p>
        </section>

        {/* Mission & Values */}
        <section className="about-section mission-values">
          <h3>Mission & Values</h3>
          <p>
            Our mission is to craft coffee that warms the soul while supporting
            local farmers and sustainable practices. We value authenticity,
            craftsmanship, and hospitality in every cup.
          </p>
        </section>

        {/* What Makes Us Unique */}
        <section className="about-section unique">
          <h3>What Makes Us Unique</h3>
          <p>
            Unlike chain cafés, we focus on slow coffee culture — every cup tells
            a story. Our French‑inspired design, handcrafted pastries, and cozy
            atmosphere make each visit unforgettable.
          </p>
        </section>

        {/* Team Introductions */}
        <section className="about-section team">
          <h3>Meet the Team</h3>
          <div className="team-grid">
            <div className="team-member">
               <img src={Lina} alt="Lina" />
              <h4>Lina</h4>
              <p>Head Barista — knows the origin of every bean she brews.</p>
            </div>
            <div className="team-member">
               <img src={Baker} alt="Marc" />
              <h4>Marc</h4>
              <p>Pastry Chef — folds croissants by hand each morning.</p>
            </div>
            <div className="team-member">
                <img src={Manager} alt="Sara" />
             
              <h4>Sara</h4>
              <p>Café Manager — ensures every guest feels at home.</p>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="about-section testimonials">
          <h3>Customer Love</h3>
          <div className="testimonial">
            “The latte here feels like a hug in a cup.”  
            <span>— Sarah, regular customer</span>
          </div>
          <div className="testimonial">
            “Best croissants outside of Paris. Truly a hidden gem.”  
            <span>— Daniel, food blogger</span>
          </div>
        </section>

        {/* Behind the Scenes */}
        <section className="about-section behind-scenes">
          <h3>Behind the Scenes</h3>
          <p>
            From bean roasting to latte art, we share our craft with you. Step
            into our kitchen and see how our pastries are folded by hand and our
            coffee beans roasted to perfection.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;

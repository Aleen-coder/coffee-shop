import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1 className="contact-title">Get in Touch ☕</h1>

        {/* Contact Info */}
        <div className="contact-info">
          <p><strong>Address:</strong> Main Street, Chtoura, Lebanon</p>
          <p><strong>Phone:</strong> +961 70 123 456</p>
          <p><strong>Email:</strong> hello@cafesavore.com</p>
        </div>

        {/* Social Links */}
        <ul className="contact-social">
          <li>Instagram: @CafeSavore</li>
          <li>Facebook: Cafe Savore</li>
          <li>Twitter: @CafeSavore</li>
        </ul>

        {/* Contact Form */}
        <form className="contact-form">
          {/* Decorative beans */}
          <span className="bean1"></span>
          <span className="bean2"></span>
          <span className="bean3"></span>

          <div className="form-field">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>

          <div className="form-field">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Write your message"></textarea>
          </div>

          <button type="submit" className="contact-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

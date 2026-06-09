import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setStatus("loading");

    setTimeout(() => {
      setStatus("success");

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setStatus("");
      }, 3000);
    }, 900);
  };

  return (
    <section id="contact" className="section contact">
      <div className="section-header">
        <p>Contact Me</p>
        <h2>
          Let&apos;s build something <span>great together.</span>
        </h2>
      </div>

      <div className="premium-contact-container">
        <div className="premium-contact-info">
          <span className="contact-mini-label">Get In Touch</span>

          <h3>Have a project idea or opportunity?</h3>

          <p>
            I am open to learning opportunities, internships, collaborations,
            and project-based work. Feel free to connect with me through email
            or social platforms.
          </p>

          <div className="contact-info-grid">
            <a
              href="mailto:armansrivastav334@gmail.com"
              className="contact-item"
            >
              <span>Email</span>
              <strong>armansrivastav334@gmail.com</strong>
            </a>

            <a
              href="https://github.com/armansrivastav334"
              target="_blank"
              rel="noreferrer"
              className="contact-item"
            >
              <span>GitHub</span>
              <strong>github.com/armansrivastav334</strong>
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="contact-item"
            >
              <span>LinkedIn</span>
              <strong>Connect on LinkedIn</strong>
            </a>

            <div className="contact-item">
              <span>Location</span>
              <strong>India</strong>
            </div>
          </div>
        </div>

        <form className="premium-contact-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <h3>Send a Message</h3>
            <p>I will try to respond as soon as possible.</p>
          </div>

          <div className="input-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="form-status success">
              Message submitted successfully!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
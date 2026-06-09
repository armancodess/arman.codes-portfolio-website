import { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_rl2rjup";
const TEMPLATE_ID = "template_qvf14w8";
const PUBLIC_KEY = "AUWon5kCghES6xL3i";

function Contact() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("loading");
    setErrorText("");

    const templateParams = {
      user_name: formData.user_name.trim(),
      user_email: formData.user_email.trim(),
      message: formData.message.trim(),
      to_email: "armansrivastav334@gmail.com",
      subject: "New Portfolio Message",
    };

    try {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      console.log("EmailJS Success:", result);

      setStatus("success");

      setFormData({
        user_name: "",
        user_email: "",
        message: "",
      });

      setTimeout(() => {
        setStatus("");
      }, 3500);
    } catch (error) {
      console.log("EmailJS Error:", error);

      setErrorText(error?.text || "Email could not be sent.");
      setStatus("error");
    }
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
            <label htmlFor="user_name">Your Name</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              placeholder="Enter your name"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="user_email">Your Email</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              placeholder="Enter your email"
              value={formData.user_email}
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
            <p className="form-status success">Message sent successfully!</p>
          )}

          {status === "error" && (
            <p className="form-status error">
              Message failed: {errorText}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
import { useEffect, useState } from "react";

const roles = [
  "Aspiring Software Engineer",
  "MERN Stack Developer",
  "React Developer",
  "Java Programmer",
];

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 45 : 85;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentRole.substring(0, text.length + 1));

        if (text === currentRole) {
          setTimeout(() => setIsDeleting(true), 900);
        }
      } else {
        setText(currentRole.substring(0, text.length - 1));

        if (text === "") {
          setIsDeleting(false);
          setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span></span>
          Open to Learning & Opportunities
        </div>

        <p className="hero-tag">Hello, I&apos;m</p>

        <h1>
          Arman <span>Srivastav</span>
        </h1>

        <h2>
          <span>{text}</span>
          <span className="typing-cursor">|</span>
        </h2>

        <p className="hero-description">
          I build clean and responsive web applications using React, Node.js,
          Express, and MongoDB. I am focused on improving my development skills
          by building real-world full-stack projects.
        </p>

        <div className="hero-tech-badges">
          <span>Java</span>
          <span>React</span>
          <span>Node.js</span>
          <span>Express</span>
          <span>MongoDB</span>
        </div>

        <div className="hero-buttons">
          <a href="#projects" className="primary-btn">
            View Projects
          </a>

          <a href="/resume.pdf" className="secondary-btn" download>
            Download Resume
          </a>
        </div>
      </div>

      <div className="hero-photo-wrapper premium-photo-wrapper">
        <div className="photo-background-shape"></div>

        <div className="photo-orbit photo-orbit-one"></div>
        <div className="photo-orbit photo-orbit-two"></div>

        <div className="floating-tech-badge badge-react">React</div>
        <div className="floating-tech-badge badge-java">Java</div>
        <div className="floating-tech-badge badge-mern">MERN</div>

        <div className="hero-photo-card premium-profile-card">
          <div className="profile-card-top-line"></div>

          <div className="profile-image-frame">
            <img src="/profile.png" alt="Armaan Srivastav" />
          </div>

          <div className="photo-status-card premium-status-card">
            <div>
              <span>Current Focus</span>
              <strong>Java • React • MERN  • DSA  </strong>
            </div>

            <div className="status-dot"></div>
          </div>
        </div>

    
        
    
      </div>
    </section>
  );
}

export default Hero;
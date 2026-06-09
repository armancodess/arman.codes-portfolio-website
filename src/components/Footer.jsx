function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="premium-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h3>arman.codes</h3>

          <p>
            A personal developer portfolio built with React, Vite, Three.js,
            and CSS. Focused on clean UI, responsive design, and real learning.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>

          <div>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer-socials">
          <h4>Connect</h4>

          <div>
            <a
              href="https://github.com/armancodess"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>

            <a href="mailto:armansrivastav334@gmail.com">Email</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} arman.codes. All rights reserved.</p>
        <p>Built by Arman Srivastav</p>
      </div>
    </footer>
  );
}

export default Footer;
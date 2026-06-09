import { useEffect, useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.classList.remove("dark-theme", "light-theme");
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="premium-navbar">
      <a href="#home" className="premium-logo" onClick={closeMenu}>
        <span>arman.codes</span>
      </a>

      <button
        className="premium-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        type="button"
      >
        {isOpen ? "×" : "☰"}
      </button>

      <div className={`premium-nav-links ${isOpen ? "active" : ""}`}>
        <a href="#home" onClick={closeMenu}>
          Home
        </a>

        <a href="#about" onClick={closeMenu}>
          About
        </a>

        <a href="#skills" onClick={closeMenu}>
          Skills
        </a>

        <a href="#projects" onClick={closeMenu}>
          Projects
        </a>

        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>

        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          type="button"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <a
          href="/resume.pdf"
          className="nav-resume-btn"
          download
          onClick={closeMenu}
        >
          Resume
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
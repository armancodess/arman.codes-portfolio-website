function About() {
  return (
    <section id="about" className="section about">
      <div className="section-header">
        <p>About Me</p>
        <h2>Building skills through real projects.</h2>
      </div>

      <div className="about-content">
        <div className="about-text premium-about-text">
          <div className="about-label">Who I Am</div>

          <h3>
            I am a B.Tech student learning full-stack development and problem
            solving.
          </h3>

          <p>
            I am focused on building clean, responsive and practical web
            applications using the MERN stack. Along with development, I am
            improving my problem-solving skills through Java and Data Structures
            & Algorithms.
          </p>

          <p>
            My goal is to become a strong software engineer by working on real
            projects, writing better code, and learning consistently every day.
          </p>

          <div className="about-highlights">
            <span>MERN Stack</span>
            <span>Java</span>
            <span>DSA</span>
            <span>Clean UI</span>
            <span>Real Projects</span>
          </div>
        </div>

        <div className="about-cards">
          <div className="info-card">
            <h3>01</h3>
            <p>Focused on Java and Data Structures & Algorithms</p>
          </div>

          <div className="info-card">
            <h3>02</h3>
            <p>Building full-stack projects using React and Node.js</p>
          </div>

          <div className="info-card">
            <h3>03</h3>
            <p>Learning backend development with Express and MongoDB</p>
          </div>

          <div className="info-card">
            <h3>04</h3>
            <p>Improving daily through practice and project building</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
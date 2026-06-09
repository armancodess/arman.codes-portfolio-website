const projects = [
  {
    number: "01",
    title: "Developer Portfolio",
    status: "In Progress",
    statusClass: "status-in-progress",
    description:
      "A modern personal portfolio website with a premium colorful UI, animated developer background, responsive layout, skills section, project showcase, and contact section.",
    tech: ["React", "Vite", "Three.js", "CSS"],
    github: "#",
    live: "#",
  },
];

function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="section-header">
        <p>My Project</p>
        <h2>
          Project I have <span>worked on and built.</span>
        </h2>
      </div>

      <div className="premium-projects-grid single-project-grid">
        {projects.map((project, index) => (
          <div className="premium-project-card" key={index}>
            <div className="project-card-top">
              <span className="project-number">{project.number}</span>

              <span className={`project-status ${project.statusClass}`}>
                {project.status}
              </span>
            </div>

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <div className="premium-tech-list">
              {project.tech.map((item, techIndex) => (
                <span key={techIndex}>{item}</span>
              ))}
            </div>

            <div className="premium-project-buttons">
              <a href={project.github} target="_blank" rel="noreferrer">
                GitHub
              </a>

              <a href={project.live} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
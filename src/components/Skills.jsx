const skillGroups = [
  {
    icon: "01",
    title: "Frontend Development",
    description:
      "Building responsive, clean and user-friendly interfaces using modern frontend tools.",
    skills: [
      { name: "HTML", level: "Strong" },
      { name: "CSS", level: "Strong" },
      { name: "JavaScript", level: "Learning+" },
      { name: "React", level: "Building" },
    ],
  },
  {
    icon: "02",
    title: "Backend Development",
    description:
      "Creating APIs, handling server logic and connecting applications with databases.",
    skills: [
      { name: "Node.js", level: "Learning" },
      { name: "Express.js", level: "Learning" },
      { name: "MongoDB", level: "Learning" },
     
    ],
  },
  {
    icon: "03",
    title: "Tools & Workflow",
    description:
      "Using developer tools to write, manage and improve code in real projects.",
    skills: [
      { name: "Git", level: "Practice" },
      { name: "GitHub", level: "Daily" },
      { name: "VS Code", level: "Daily" },
      { name: "Postman", level: "Testing" },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="section-header">
        <p>My Skills</p>
        <h2>
          Technologies I am <span>learning and building with.</span>
        </h2>
      </div>

      <div className="premium-skills-grid">
        {skillGroups.map((group, index) => (
          <div className="skill-category-card" key={index}>
            <div className="skill-category-top">
              <div className="skill-category-icon">{group.icon}</div>

              <div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
            </div>

            <div className="premium-skill-list">
              {group.skills.map((skill, skillIndex) => (
                <div className="premium-skill-item" key={skillIndex}>
                  <span>{skill.name}</span>
                  <small>{skill.level}</small>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
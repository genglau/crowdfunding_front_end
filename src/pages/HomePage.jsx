import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import "./global.css";

function HomePage() {
  const { projects } = useProjects();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [projects]);

  return (
    <div className="home">

        <div className="about-section">
            <h1>About Little Dreamers</h1>
            <p>
            Welcome to our Little Dreamers, a kids-friendly crowdfunding platform! Create, pledge, and watch projects grow!   
            </p>

        </div>

      <div className="slideshow">
        {projects.length > 0 && (
          <Link to={`/project/${projects[current].id}`}>
            <img src={projects[current].image} alt="Project" />
          </Link>
        )}
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <Link to={`/project/${project.id}`} key={project.id} className="project-card">
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

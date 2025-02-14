import styles from "./Projects.module.scss";
import data from "../../data/projects.json";
import Card from "../Card/Card";

const Projects = () => {
  return (
    <div className={styles.projects}>
      <h1>Featured Projects</h1>
        <div className={styles.projects__cards}>
            {data.map((project) => (
                <Card
                key={project.id}
                id={project.id}
                name={project.name}
                image={project.image}
                />
            ))}
        </div>
        
    </div>
  );
};

export default Projects;

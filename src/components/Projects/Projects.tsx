import styles from "./Projects.module.scss";
import data from "../../data/projects.json";
import Card from "../Card/Card";
import Link from "next/link";

const Projects = () => {
  return (
    <div className={styles.projects}>
      <h1>Featured Projects</h1>
      <div className={styles.projects__cards}>
        {data.map((project) => (
          <Link href={`/projects/${project.slug}`} key={project.id}>
            <Card
              key={project.id}
              id={project.id}
              name={project.name}
              image={project.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;

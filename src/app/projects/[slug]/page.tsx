"use client";

import styles from "./Portfolio.module.scss";
import { ProjectProps } from "@/types";
import data from "@/data/projects.json";
import { useEffect, useState, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Button from "@/components/Button/Button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PortfolioPage = () => {
  const params = useParams();
  const [project, setProject] = useState<ProjectProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Get slug from URL parameters
    const slug = params?.slug as string;

    if (!slug) {
      setIsLoading(false);
      return;
    }

    const foundProject = data.find(
      (project) =>
        project.name.toLowerCase() === slug.toLowerCase().replace(/-/g, " ")
    );

    if (foundProject) {
      setProject(foundProject);
    } else {
      notFound();
    }

    setIsLoading(false);
  }, [params?.slug]);

  // Animation setup
  useEffect(() => {
    if (!project || !containerRef.current) return;

    animationRef.current = gsap.context(() => {
      // Animate all sections with data-animate attribute
      gsap.utils
        .toArray("[data-animate='slide-up']")
        .forEach((element: any) => {
          gsap.from(element, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          });
        });

      // Stagger animation for tech buttons
      gsap.from(".tech-item", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".portfolio__hero__grid__tech",
          start: "top 80%",
        },
      });

      // Image animation
      gsap.from(".portfolio-image", {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".portfolio-image",
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => animationRef.current?.revert();
  }, [project]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className={styles.shimmerContainer}>
          {/* Hero Section Shimmer */}
          <div className={styles.shimmerHero}>
            <div className={styles.shimmerLine} />
            <div className={styles.shimmerLineShort} />
            <div className={styles.shimmerGrid}>
              <div className={styles.shimmerBox} />
              <div className={styles.shimmerBox} />
              <div className={styles.shimmerBox} />
            </div>
            <div className={styles.shimmerLineQuote} />
          </div>

          {/* Image Shimmer */}
          <div className={styles.shimmerImage} />

          {/* Role Section Shimmer */}
          <div className={styles.shimmerRole}>
            <div className={styles.shimmerLine} />
            <div className={styles.shimmerList}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.shimmerListItem} />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <div className={styles.project} ref={containerRef}>
      <Header />
      {/* {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : ( */}
      <div className={styles.portfolio}>
        <div className={styles.portfolio__hero}>
          <h3 className={styles.portfolio__hero__name} data-animate="slide-up">
            {project.name}
          </h3>
          <p data-animate="slide-up">Industry - {project.industry}</p>

          <div className={styles.portfolio__hero__grid} data-animate="slide-up">
            {/* Grid items */}
            <div>
              <h4>Challenge</h4>
              <p>{project.challenge}</p>
            </div>
            <div>
              <h4>Services</h4>
              <p>{project.services}</p>
            </div>
            <div>
              <h4>Tech Stacks</h4>
              <div className={styles.portfolio__hero__grid__tech}>
                {project.technology.map((tech, index) => (
                  <Button
                    key={index}
                    className={`${styles.portfolio__hero__button} tech-item`}
                  >
                    {tech}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div
            className={styles.portfolio__hero__quote}
            data-animate="slide-up"
          >
            <p>&quot;{project.quote}&quot;</p>
          </div>
        </div>

        <div className={`${styles.portfolio__image} portfolio-image`}>
          <img src={project.image} alt={project.name} />
        </div>

        <div className={styles.portfolio__role} data-animate="slide-up">
          <h4>MY ROLE</h4>
          <ul>
            {project.job_description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* )} */}
      <Footer />
    </div>
  );
};

export default PortfolioPage;

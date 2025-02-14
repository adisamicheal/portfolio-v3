"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.scss";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const dashRef = useRef<HTMLSpanElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.to(
      dashRef.current,
      {
        width: "200px",
        opacity: 0.8,
        ease: "power4.out",
        duration: 1.5,
      },
      0
    )
      .to(
        frontRef.current,
        {
          x: "-100vw",
          rotate: -10,
          stagger: 0.1,
          ease: "power4.out",
          duration: 2,
        },
        0
      )
      .to(
        endRef.current,
        {
          x: "100vw",
          rotate: 10,
          stagger: 0.1,
          ease: "power4.out",
          duration: 2,
        },
        0
      )
      // Add services animations
      .fromTo(
        servicesRef.current,
        {
          opacity: 0.5,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power4.out",
          duration: 1.5,
        },
        1.5
      );

    // Add individual letter animations
    gsap.fromTo(
      ".letter",
      {
        opacity: 0,
        y: 50,
        rotationX: 90,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".letter",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className={styles.hero}>
      <div>
        <h1 className={styles.hero__role}>
          <div ref={frontRef}>
            {["F", "r", "o", "n", "t"].map((letter, i) => (
              <span key={i} className={`${styles.hero__role__span} letter`}>
                {letter}
              </span>
            ))}
          </div>
          <div>
            <span ref={dashRef} className={styles.hero__role__dash}>
              —
            </span>
          </div>
          <div ref={endRef}>
            {["E", "n", "d"].map((letter, i) => (
              <span key={i} className={`${styles.hero__role__span} letter`}>
                {letter}
              </span>
            ))}
          </div>
        </h1>

        <span className={styles.hero__role__cap}>
          <h1 className={styles.hero__role__engineer}>Engineer</h1>
          <div className={styles.hero__role__about}>
            <p>
              <span style={{ fontWeight: 700 }}>About -</span> I am a software
              engineer based in Lisbon, Portugal, highly skilled with web
              performance, accessibility & UI Engineering. Focused on creating
              solutions on the web, working with brands and industry leaders
              such as TLScontact, Kafene, Enyata, Piggyvest amongst others to
              achieve this.
            </p>
          </div>
        </span>
      </div>
      <div ref={servicesRef} className={styles.hero__services}>
        <div className={styles.hero__services__design}>
          <h2>Design.</h2>
          <p>
            Frequent times i find myself putting texts and shapes together to
            born out a pleasing UI like the one you are going through right now.
            I utilize tools like Figma, Adobe XD and Corel draw for various
            design crafting and manipulation.
          </p>
        </div>
        <div className={styles.hero__services__development}>
          <h2>Development.</h2>
          <p>
            In building applications, i utilize but not limited to tools like
            Typescript, Javascript, React, Vue, Node.Js, SCSS, Python among
            others. I can absolutely function independently and deliver fast,
            resilient solutions optimized for scale with performance,
            accessibility, usability and scalability as the building blocks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

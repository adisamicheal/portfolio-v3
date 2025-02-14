"use client";

import styles from "./page.module.css";
import Header from "../components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

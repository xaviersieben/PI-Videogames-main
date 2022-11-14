import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function LandingPage() {
  return (
    <>
      <div className={styles.landingContainer}>
        <div className={styles.landingPag}>
          <h1 className={styles.landingTitle}>Videogames</h1>
          <Link to="/home">
            <button className={styles.landingBtn}>
              <span>Empezar</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

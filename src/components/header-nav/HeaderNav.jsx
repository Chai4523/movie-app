import React from "react";
import styles from "./headerNav.module.css"

export default function HeaderNav() {
  return (
    <>
    <header className={styles.header}>
      <h3 className="header-name">movie-app</h3>
      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#search">Search</a>
      </nav>
    </header>
    </>
  );
}

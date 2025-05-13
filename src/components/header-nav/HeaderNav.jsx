import React from "react";
import { Box, Group, Input, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import styles from "./headerNav.module.css";
import { MdSearch } from "react-icons/md";
import { IoTvOutline } from "react-icons/io5";
import { SiMyanimelist } from "react-icons/si";
import { FaFilm } from "react-icons/fa";
import { FiTv } from "react-icons/fi";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function HeaderNav() {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${showHeader ? styles.show : styles.hide}`}
      >
        <div className={styles["blur-bg"]}></div>
        <Group>
          <Link className={styles.logo} to={"/"}>
            <IoTvOutline />
            <h3>movie-app</h3>
          </Link>
        </Group>

        <Group className={styles["nav-links"]}>
          <Link className={styles["nav-item"]} to={`/search/movie`}>
            <FaFilm />
            <Text pl={6}>Movies</Text>
          </Link>
          <Link className={styles["nav-item"]} to={`/search/tv`}>
            <FiTv />
            <Text pl={6}>Shows</Text>
          </Link>
          <Link className={styles["nav-item"]} to={`/`}>
            <SiMyanimelist />
            <Text pl={6}>Anime</Text>
          </Link>
          {/* <Input
            size="md"
            placeholder="Search"
            leftSection={<MdSearch size={16} stroke={1.5} />}
          /> */}
        </Group>
      </header>
    </>
  );
}

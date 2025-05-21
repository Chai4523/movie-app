import React from "react";
import { Box, Burger, Group, Input, Menu, Text } from "@mantine/core";
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
import { useDisclosure } from "@mantine/hooks";

export default function HeaderNav() {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const [opened, { toggle }] = useDisclosure();

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
        </Group>

        <Menu opened={opened} onChange={toggle} className={styles.menu}>
          <Menu.Target>
            <Box>
              <Burger
                opened={opened}
                onClick={toggle}
                aria-label="Toggle navigation"
              />
            </Box>
          </Menu.Target>
          <Menu.Dropdown
            className={styles["menu-dropdown"]}
            w={"98vw"}
            left={0}
            ml={5}
            mr={5}
          >
            <Link to={`/search/movie`}>
              <Menu.Item
                leftSection={<FaFilm />}
                className={styles["menu-item"]}
              >
                Movies
              </Menu.Item>
            </Link>
            <Link to={`/search/tv`}>
              <Menu.Item leftSection={<FiTv />} className={styles["menu-item"]}>
                Shows
              </Menu.Item>
            </Link>
            <Link to={`/`}>
              <Menu.Item
                leftSection={<SiMyanimelist />}
                className={styles["menu-item"]}
              >
                Anime
              </Menu.Item>
            </Link>
          </Menu.Dropdown>
        </Menu>
      </header>
    </>
  );
}

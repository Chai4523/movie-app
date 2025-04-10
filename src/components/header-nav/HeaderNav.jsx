import React from "react";
import { Box, Group, Input } from "@mantine/core";
import "@mantine/core/styles.css";
import styles from "./headerNav.module.css";
import { MdSearch } from "react-icons/md";
import { IoTvOutline } from "react-icons/io5";
import { SiMyanimelist } from "react-icons/si";
import { FaFilm } from "react-icons/fa";
import { FiTv } from "react-icons/fi";

export default function HeaderNav() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles["blur-bg"]}></div>
        <Group>
          <IoTvOutline />
          <h3 className="header-name">movie-app</h3>
        </Group>

        <Group className={styles["nav-links"]}>
          <Box className={styles["nav-item"]}>
            <FaFilm />
            <a href="#" onClick={(event) => event.preventDefault()}>
              Movies
            </a>
          </Box>
          <Box className={styles["nav-item"]}>
            <FiTv />
            <a href="#" onClick={(event) => event.preventDefault()}>
              Shows
            </a>
          </Box>
          <Box className={styles["nav-item"]}>
            <SiMyanimelist />
            <a href="#" onClick={(event) => event.preventDefault()}>
              Anime
            </a>
          </Box>
          <Input
            size="md"
            placeholder="Search"
            leftSection={<MdSearch size={16} stroke={1.5} />}
          />
        </Group>
      </header>
    </>
  );
}

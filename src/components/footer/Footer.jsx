import { Box, Group, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import "@mantine/core/styles.css";
import styles from "./footer.module.css";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail, FiArrowUpRight } from "react-icons/fi";

export default function Footer() {
  return (
    <Box m={20} p="40 10 10" pos="relative">
      <Box className={styles.content} mb={40}>
        <Stack gap={0}>
          <Title order={2} mb={10}>
            About
          </Title>
          <Text fz={14} maw={360} lh="normal">
            Movies, TV shows, anime, manga — it's all here. Dive into trending
            titles, browse by genre, and uncover hidden gems in one seamless,
            beautifully crafted experience. From iconic blockbusters to
            underground hits, your next favorite is just a scroll away.
          </Text>
        </Stack>
        <Group className={styles["row-gap-20"]} align="start">
          <Stack align="start" miw={160} gap={0}>
            <Title order={2} mb={10}>
              Browse
            </Title>
            <Stack gap={"xs"}>
              <Link to={`/`}>Home</Link>
              <Link to={`/search/movie`}>Movies</Link>
              <Link to={`/search/tv`}>Tv Shows</Link>
              <Link to={`/search/anime`}>Anime</Link>
              <Link to={`/search/manga`}>Manga</Link>
            </Stack>
          </Stack>
          <Stack align="start" gap={0}>
            <Title order={2} mb={10}>
              General
            </Title>
            <Stack>
              <a
                href="https://chai4523.github.io/portfolio/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Group align="center" gap={5}>
                  <FiArrowUpRight size={20} /> <span>Portfolio</span>
                </Group>
              </a>
              <a
                href="https://github.com/Chai4523/movie-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Group align="center" gap={7}>
                  <FaGithub size={20} /> <span>Github</span>
                </Group>
              </a>
              <a
                href="https://www.linkedin.com/in/chai4523/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Group align="center" gap={7}>
                  <FaLinkedin size={20} /> <span>LinkedIn</span>
                </Group>
              </a>
              <a href="mailto:chaichungyee@gmail.com">
                <Group align="center" gap={7}>
                  <FiMail size={20} /> <span>Contact</span>
                </Group>
              </a>
            </Stack>
          </Stack>
        </Group>
      </Box>
      <Text className={styles.author}>
        Created by{" "}
        <a className={styles.link} href="https://chai4523.github.io/portfolio/">
          Chai Chung Yee
        </a>
      </Text>
      <Group className={styles.attribution}>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/tmdb.svg" alt="" className={styles.logo} />
        </a>
        <a href="https://jikan.moe/" target="_blank" rel="noopener noreferrer">
          <img src="/jikan.svg" alt="" className={styles.logo} />
        </a>
      </Group>
    </Box>
  );
}

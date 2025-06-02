import {
  Box,
  Overlay,
  Text,
  Title,
  RingProgress,
  Button,
  ActionIcon,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { useState, useEffect } from "react";
import styles from "./heroCarousel.module.css";

import { FaCircleInfo } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import ImgPlaceholder from "../placeholder/ImgPlaceholder";

function Hero({
  id,
  title,
  overview,
  type,
  genres,
  score,
  backdrop_path,
  poster_path,
  source,
  isMobile,
}) {
  const iconInfo = <FaCircleInfo size={18} />;
  const navigate = useNavigate();

  return (
    <Box
      style={{ backgroundImage: `url(${backdrop_path})` }}
      className={`${styles.hero} ${source === "TMDB" ? styles.tmdb : styles.ani}`}
    >
      <Overlay
        zIndex={0}
        gradient="linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%)"
      />
      <Box className={styles.content}>
        <Title order={1} className={styles.title}>
          {title}
        </Title>
        <Text className={styles.overview} lineClamp={3}>
          {overview}
        </Text>
        <Text className={styles.genre}>{genres}</Text>
        <div className={styles["action-row"]}>
          <Button
            variant="white"
            color="black"
            leftSection={iconInfo}
            size={isMobile ? "sm" : "lg"}
            onClick={() => navigate(`/${type}/${id}`)}
          >
            More Info
          </Button>
          <ActionIcon
            variant="outline"
            aria-label="action icon"
            size={isMobile ? 48 : 60}
            radius={isMobile ? 48 : 60}
            color="dimgrey"
            bd="2px solid dimgrey"
          >
            <CiBookmark size={26} color="white" />
          </ActionIcon>
          <RingProgress
            size={isMobile ? 55 : 70}
            thickness={isMobile ? 3 : 4.8}
            roundCaps
            sections={[{ value: score * 10, color: "white" }]}
            label={
              <Text
                c="white"
                fw={500}
                ta="center"
                size={isMobile ? "md" : "lg"}
              >
                {Number.parseFloat(score).toFixed(1)}
              </Text>
            }
          />
        </div>
      </Box>

      <Box className={styles.poster}>
        {poster_path ? (
          <img
            src={poster_path}
            alt={`A poster of ${title}`}
            classNames={styles}
          />
        ) : (
          <ImgPlaceholder type="poster" variant="hero" />
        )}
      </Box>
    </Box>
  );
}

export default function HeroCarousel({ data }) {
  const autoPlay = useRef(Autoplay({ delay: 7000 }));
  const [embla, setEmbla] = useState(null);
  const useMobile = useMediaQuery("(max-width: 770px)");
  const [isMobile, setIsMobile] = useState(useMobile);

  useEffect(() => {
    setIsMobile(useMobile);
  }, [useMobile]);

  const slides = data.map((item) => (
    <Carousel.Slide key={item.id}>
      <Hero {...item} isMobile={isMobile} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      color="white"
      align="start"
      loop={true}
      getEmblaApi={setEmbla}
      plugins={[autoPlay.current]}
      onMouseEnter={autoPlay.current.stop}
      onMouseLeave={() => autoPlay.current.play()}
      withIndicators={!isMobile}
      classNames={styles}
      withControls={!isMobile}
      nextControlIcon={<TbChevronRight size={50} />}
      previousControlIcon={<TbChevronLeft size={50} />}
    >
      {slides}
    </Carousel>
  );
}

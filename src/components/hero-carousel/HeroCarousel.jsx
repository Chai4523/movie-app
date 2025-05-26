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
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { useState, useEffect } from "react";
import styles from "./heroCarousel.module.css";
import * as api from "../../utils/apiHelper";
import { GenreProvider, useGenres } from "../../contexts/GenreContext";

import { FaCircleInfo } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

function Hero({
  id,
  backdrop_path,
  poster_path,
  title,
  name,
  overview,
  media_type,
  genre_ids,
  vote_average,
  isMobile
}) {
  const backdrop = api.getImage(backdrop_path, "w1280");
  const poster = api.getImage(poster_path, "w500");
  const iconInfo = <FaCircleInfo size={18} />;
  const displayTitle = title || name;
  const { getGenreByIds, loading } = useGenres();
  const navigate = useNavigate();

  return (
    <Box
      style={{ backgroundImage: `url(${backdrop})` }}
      className={styles.hero}
    >
      <Overlay
        zIndex={0}
        gradient="linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%)"
      />
      <Box className={styles.content}>
        <Title order={1} className={styles.title}>
          {displayTitle}
        </Title>
        <Text className={styles.overview} lineClamp={3}>
          {overview}
        </Text>
        <Text className={styles.genre}>
          {!loading && getGenreByIds(genre_ids)}
        </Text>
        <div className={styles["action-row"]}>
          <Button
            variant="white"
            color="black"
            leftSection={iconInfo}
            size={isMobile ? "sm" : "lg"}
            onClick={() => navigate(`/${media_type}/${id}`)}
          >
            More Info
          </Button>
          <ActionIcon
            variant="outline"
            aria-label="action icon"
            size={isMobile ? 48 : 60}
            radius={isMobile? 48: 60}
            color="dimgrey"
            bd="2px solid dimgrey"
          >
            <CiBookmark size={26} color="white" />
          </ActionIcon>
          <RingProgress
            size={isMobile? 55 : 70}
            thickness={isMobile? 3 : 4.8}
            roundCaps
            sections={[{ value: vote_average * 10, color: "white" }]}
            label={
              <Text c="white" fw={500} ta="center" size={isMobile ? "md" : "lg"}>
                {Number.parseFloat(vote_average).toFixed(1)}
              </Text>
            }
          />
        </div>
      </Box>
      <Box className={styles.poster}>
        <img src={poster} alt={`A poster of ${title}`} classNames={styles} />
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
    <>
      <GenreProvider>
        <Carousel
          color="white"
          align="start"
          loop={true}
          getEmblaApi={setEmbla}
          plugins={[autoPlay.current]}
          withIndicators={!isMobile}
          classNames={styles}
          withControls={!isMobile}
          nextControlIcon={<TbChevronRight size={50} />}
          previousControlIcon={<TbChevronLeft size={50} />}
        >
          {slides}
        </Carousel>
      </GenreProvider>
    </>
  );
}

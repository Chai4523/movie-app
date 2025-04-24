import {
  ActionIcon,
  Box,
  Button,
  Group,
  HoverCard,
  Overlay,
  RingProgress,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import styles from "./cardCarousel.module.css";
import * as api from "../../utils/apiHelper";
import { useGenres } from "../../contexts/GenreContext";

import { FaStar } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { useState } from "react";

// TODO: refactor to mediaCarousel
function Card({
  backdrop_path,
  poster_path,
  title,
  name,
  overview,
  media_type,
  genre_ids,
  vote_average,
  first_air_date,
  release_date,
  disabled,
}) {
  const displayTitle = title || name;
  const poster = api.getImage(poster_path, "w342");
  const backdrop = api.getImage(backdrop_path, "w780");
  const { getGenreByIds, loading } = useGenres();

  const ringColor = (vote_average) => {
    if (vote_average > 7) return "green";
    if (vote_average > 5) return "yellow";
    return "red";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const releaseDate = release_date || first_air_date;
  const displayDate = releaseDate ? formatDate(releaseDate) : "Date N/A";
  const formatMediaType = (media_type) => {
    if (media_type == "tv") return "TV";
    return (
      String(media_type).charAt(0).toUpperCase() + String(media_type).slice(1)
    );
  };

  const iconInfo = <FaCircleInfo size={18} />;

  return (
    <HoverCard
      openDelay={150}
      closeDelay={200}
      position="right"
      disabled={disabled}
    >
      <HoverCard.Target>
        <div className={styles.card}>
          <img src={poster} alt="" className={styles["card-poster"]} />
          <Box className={styles.info}>
            <RingProgress
              ml={5}
              size={42}
              thickness={2}
              roundCaps
              className={styles["ring-progress"]}
              sections={[
                { value: vote_average * 10, color: ringColor(vote_average) },
              ]}
              label={
                <Text c="white" fw={500} ta="center" size="xs">
                  {Number.parseFloat(vote_average).toFixed(1)}
                </Text>
              }
            />
            <Text truncate="end" maw={196} c={"white"}>
              {displayTitle}
            </Text>
            <Box className={styles["info-row"]}>
              <Text>{displayDate}</Text>
              <span>•</span>
              <Text>{formatMediaType(media_type)}</Text>
            </Box>
          </Box>
        </div>
      </HoverCard.Target>
      <HoverCard.Dropdown p={0} className={styles["br-10"]}>
        <Box maw={440} bg={"black"} className={styles["br-10"]}>
          <img src={backdrop} alt="" className={styles["card-backdrop"]} />
          <Overlay
            gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)"
            opacity={0.85}
            zIndex={0}
            mah={250}
          />
          <Box className={styles["hover-content"]}>
            <Box className={styles["info-row"]}>
              <Text fz={24} fw={700} lh={1.2} lts={-0.02} c={"white"}>
                {displayTitle}
              </Text>
              <Box className={styles.ratings}>
                <FaStar className={styles.star} size={12} />
                <Text>{Number.parseFloat(vote_average).toFixed(1)}</Text>
              </Box>
            </Box>
            <Text>{!loading && getGenreByIds(genre_ids)}</Text>
            <Text mt={16}>{overview}</Text>
            <Box className={styles["button-row"]}>
              <Button
                variant="white"
                color="black"
                leftSection={iconInfo}
                radius={5}
                w={220}
              >
                More info
              </Button>
              <Tooltip label="Add to list" openDelay={150}>
                <Button radius={10} p={13} bg="dark">
                  <FaPlus size={10} color="white" />
                </Button>
              </Tooltip>
              <Tooltip label="Share" openDelay={150}>
                <Button radius={10} p={13} bg="dark">
                  <FaShare size={10} color="white" />
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}

export default function CardCarousel({
  title = "Trending",
  data,
  disabled = false,
}) {
  const [embla, setEmbla] = useState(null);

  const handleNext = () => embla?.scrollNext();
  const handlePrev = () => embla?.scrollPrev();

  const slides = data.map((item) => (
    <Carousel.Slide key={item.id}>
      <Card {...item} disabled={disabled} />
    </Carousel.Slide>
  ));

  return (
    <>
      <Group className={styles["section-heading"]}>
        <Title order={2} c={"white"} pos={"relative"} p={10}>
          {title}
        </Title>
        <Group mr={10}>
          <ActionIcon
            onClick={handlePrev}
            variant="subtle"
            color="gray"
            size={"xl"}
          >
            <TbChevronLeft size={30} />
          </ActionIcon>
          <ActionIcon
            onClick={handleNext}
            variant="subtle"
            color="gray"
            size={"xl"}
          >
            <TbChevronRight size={30} />
          </ActionIcon>
        </Group>
      </Group>
      <Carousel
        slideSize={210}
        slideGap="sm"
        align="start"
        containScroll="trimSnaps"
        p={10}
        ml={20}
        mr={20}
        draggable={false}
        classNames={styles}
        getEmblaApi={setEmbla}
        withControls={false}
      >
        {slides}
      </Carousel>
    </>
  );
}

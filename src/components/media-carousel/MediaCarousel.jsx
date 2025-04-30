import {
  ActionIcon,
  Box,
  Group,
  HoverCard,
  RingProgress,
  Text,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import styles from "./mediaCarousel.module.css";
import * as api from "../../utils/apiHelper";
import HoverInfo from "./HoverInfo";

import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { useState } from "react";
import { GenreProvider } from "../../contexts/GenreContext";
import { Link } from "react-router-dom";

function Card(props) {
  const {
    id,
    adult,
    backdrop_path,
    poster_path,
    title,
    name,
    overview,
    media_type,
    genre_ids,
    vote_count,
    vote_average,
    first_air_date,
    release_date,
    disabled,
  } = props;
  const displayTitle = title || name;
  const poster = api.getImage(poster_path, "w342");

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

  return (
    <HoverCard
      openDelay={150}
      closeDelay={200}
      position="right"
      disabled={disabled}
    >
      <HoverCard.Target>
        <Link className={styles.card} to={`/${media_type}/${id}`}>
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
        </Link>
      </HoverCard.Target>
      <HoverCard.Dropdown p={0} className={styles["br-10"]}>
        {disabled || (
          <GenreProvider>
            <HoverInfo {...props} />
          </GenreProvider>
        )}
      </HoverCard.Dropdown>
    </HoverCard>
  );
}

export default function MediaCarousel({
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

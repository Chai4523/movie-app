import { useState } from "react";
import {
  ActionIcon,
  Box,
  Group,
  HoverCard,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import styles from "./mediaCarousel.module.css";
import HoverInfo from "./HoverInfo";
import MediaCard from "./MediaCard";
import { GenreProvider } from "../../contexts/GenreContext";

import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

function Card(props) {
  const { disabled } = props;

  return (
    <HoverCard
      openDelay={150}
      closeDelay={200}
      position="right"
      disabled={disabled}
    >
      <HoverCard.Target>
        <Box>
          <MediaCard {...props} />
        </Box>
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

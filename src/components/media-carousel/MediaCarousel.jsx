import { useState, useEffect } from "react";
import { ActionIcon, Box, Group, HoverCard, Text, Title } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import styles from "./mediaCarousel.module.css";
import HoverInfo from "./HoverInfo";
import MediaCard from "./MediaCard";
import { GenreProvider } from "../../contexts/GenreContext";
import { useMediaQuery } from "@mantine/hooks";

import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

function Card(props) {
  // const { disabled } = props;
  // TODO: refactor hoverinfo to fit data mapper
  let disabled = true

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
  const useMobile = useMediaQuery("(max-width: 770px)");
  const [isMobile, setIsMobile] = useState(useMobile);

  const slides = data.map((item) => (
    <Carousel.Slide key={item.id}>
      <Card {...item} disabled={disabled || isMobile} />
    </Carousel.Slide>
  ));

  useEffect(() => {
    setIsMobile(useMobile);
  }, [useMobile]);

  return (
    <Box p={10} m={20}>
      <Group className={styles["section-heading"]}>
        <Title order={2} c={"white"} pos={"relative"}>
          {title}
        </Title>
        {!isMobile && data.length && (
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
        )}
      </Group>

      {data.length ? (
        <Carousel
          slideSize={isMobile ? 150 : 210}
          slideGap={isMobile ? "xs" : "sm"}
          align="start"
          containScroll="trimSnaps"
          classNames={styles}
          getEmblaApi={setEmbla}
          withControls={false}
          skipSnaps
        >
          {slides}
        </Carousel>
      ) : (
        <Text fw={700} size="lg" ta={"center"} p={10} mt={20} mb={20}>
          No results found.
        </Text>
      )}
    </Box>
  );
}

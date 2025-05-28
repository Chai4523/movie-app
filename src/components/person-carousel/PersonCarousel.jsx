import { useState, useEffect } from "react";
import { ActionIcon, Box, Group, Text, Title } from "@mantine/core";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";
import * as api from "../../utils/apiHelper";
import styles from "./personCarousel.module.css";

import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import ImgPlaceholder from "../placeholder/ImgPlaceholder";

function PersonSlide({
  id,
  gender,
  name,
  original_name,
  profile_path,
  character,
}) {
  const profile = api.getImage(profile_path, "w185") || null;

  return (
    <div>
      {profile ? (
        <img
          src={profile}
          alt={`a picture of ${name}`}
          className={styles["profile-img"]}
        />
      ) : (
        <ImgPlaceholder type="person" variant="cast" />
      )}
      <Title order={4} c={"white"} ta={"center"}>
        {name}
      </Title>
      <Text ta={"center"}>{character}</Text>
    </div>
  );
}

export default function PersonCarousel({ data }) {
  const [embla, setEmbla] = useState(null);
  const useMobile = useMediaQuery("(max-width: 770px)");
  const [isMobile, setIsMobile] = useState(useMobile);
  const { width } = useViewportSize();

  useEffect(() => {
    setIsMobile(useMobile);
  }, [useMobile]);

  const handleNext = () => embla?.scrollNext();
  const handlePrev = () => embla?.scrollPrev();

  const slideSize = isMobile ? 140 : 190;
  const showControls = data.length * (slideSize + 10) > width + 0.4 * slideSize;
  const slides = data.map((item) => (
    <Carousel.Slide key={item.id}>
      <PersonSlide {...item} />
    </Carousel.Slide>
  ));

  return (
    <Box p={10} m={20}>
      <Group className={styles["section-heading"]}>
        <Title order={2} c={"white"} pos={"relative"}>
          Cast
        </Title>
        {!isMobile && showControls && (
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

      {data.length <= 0 ? (
        <Text fw={700} fz={"lg"} ta={"center"} p={10} mt={20} mb={20}>
          No cast found.
        </Text>
      ) : (
        <Carousel
          slideSize={slideSize}
          slideGap={isMobile ? "xs" : "md"}
          align="start"
          containScroll="trimSnaps"
          classNames={styles}
          getEmblaApi={setEmbla}
          withControls={false}
          skipSnaps
        >
          {slides}
        </Carousel>
      )}
    </Box>
  );
}

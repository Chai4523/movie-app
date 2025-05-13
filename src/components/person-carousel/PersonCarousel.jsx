import { useState } from "react";
import { ActionIcon, Group, Text, Title } from "@mantine/core";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import * as api from "../../utils/apiHelper";
import styles from "./personCarousel.module.css";

import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

function PersonSlide({
  id,
  gender,
  name,
  original_name,
  profile_path,
  character,
}) {
  const profile = api.getImage(profile_path, "w185") || "/avatar.png";

  return (
    <div>
      <div className={styles["img-container"]}>
        <img
          src={profile}
          alt={`a picture of ${name}`}
          className={styles["profile-img"]}
        />
      </div>
      <Title order={4} c={"white"} ta={"center"}>
        {name}
      </Title>
      <Text ta={"center"}>{character}</Text>
    </div>
  );
}

export default function PersonCarousel({ data }) {
  const [embla, setEmbla] = useState(null);

  const handleNext = () => embla?.scrollNext();
  const handlePrev = () => embla?.scrollPrev();

  const slides = data.map((item) => (
    <Carousel.Slide key={item.id}>
      <PersonSlide {...item} />
    </Carousel.Slide>
  ));

  return (
    <>
      <Group className={styles["section-heading"]}>
        <Title p={10} order={2} c={"white"} pos={"relative"}>
          Cast
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
        slideSize={190}
        slideGap="md"
        align="start"
        containScroll="trimSnaps"
        p={10}
        ml={20}
        mr={20}
        mb={30}
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
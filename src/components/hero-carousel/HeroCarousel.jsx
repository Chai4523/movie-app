import { Carousel } from "@mantine/carousel";
import {
  Box,
  Overlay,
  Paper,
  Text,
  Title,
  Progress,
  useMantineTheme,
  RingProgress,
  Button,
  ActionIcon,
  Group,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import styles from "./heroCarousel.module.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import * as api from "../../utils/apiHelper";
import { FaCircleInfo } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";

function Hero({
  backdrop_path,
  title,
  overview,
  media_type,
  genre_ids,
  vote_average,
}) {
  const image = api.getImage(backdrop_path, "w1280");
  const iconInfo = <FaCircleInfo size={18} />;

  return (
    <>
      <Paper
        shadow="xs"
        p="xl"
        style={{ backgroundImage: `url(${image})` }}
        className={styles.card}
      >
        <Overlay
          zIndex={0}
          gradient="linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%)"
        />
        <Box className={styles.content}>
          <div>
            <Title order={3} className={styles.title}>
              {title}
            </Title>
            <Text className={styles.overview} size="sm" lineClamp={2}>
              {overview}
            </Text>
          </div>
          <Text>{genre_ids}</Text>
          <div className={styles["action-row"]}>
            <Button variant="white" color="black" leftSection={iconInfo}>
              More Info
            </Button>
            <ActionIcon
              variant="outline"
              aria-label="action icon"
              size={60}
              radius={60}
              color="dimgrey"
              bd="2px solid dimgrey"
            >
              <CiBookmark size={30} color="white" />
            </ActionIcon>
            <RingProgress
              size={70}
              thickness={4.8}
              roundCaps
              sections={[{ value: vote_average * 10, color: "white" }]}
              label={
                <Text c="white" fw={500} ta="center" size="lg">
                  {Math.round(vote_average * 10) / 10}
                </Text>
              }
            />
          </div>
        </Box>
        <div className={styles.overlay}></div>
      </Paper>
    </>
  );
}

const data = [
  {
    backdrop_path: "/ycwQXWQry40VV12RDa3B4fF1yWB.jpg",
    title: "The Residence",
    overview:
      "A brilliant, eccentric detective must solve a murder in the White House residence — where the staff and guests at a state dinner are all suspects.",
    media_type: "tv",
    genre_ids: [18, 35, 9648],
    vote_average: 6.4,
  },
  {
    backdrop_path: "/d7905caSmcdAw45egcu4pkyKYvH.jpg",
    title: "Tyler Perry's Duplicity",
    overview:
      "High-powered attorney Marley faces her most personal case yet when she is tasked with uncovering the truth behind the murder of her best friend Fela’s husband. With the help of her boyfriend – a former cop turned private investigator – Marley’s search for what really happened leads her down a treacherous maze of deception and betrayal.",
    media_type: "movie",
    genre_ids: [53, 18],
    vote_average: 8.172,
  },
  {
    backdrop_path: "/8MtMFngDWvIdRo34rz3ao0BGBAe.jpg",
    title: "Severance",
    overview:
      "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth about their jobs.",
    media_type: "tv",
    genre_ids: [18, 9648, 10765],
    vote_average: 8.42,
  },
];

export default function HeroCarousel() {
  const autoPlay = useRef(Autoplay({ delay: 7000 }));
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Hero {...item} />
    </Carousel.Slide>
  ));

  return (
    <>
      <Carousel
        align="start"
        loop={true}
        plugins={[autoPlay.current]}
        withIndicators
        classNames={styles}
      >
        {slides}
      </Carousel>
      <Progress value={1} size="xs" color="white" />
    </>
  );
}

import { Carousel } from "@mantine/carousel";
import {
  Box,
  Overlay,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./heroCarousel.module.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import * as api from "../../utils/apiHelper";

function Hero({
  backdrop_path,
  title,
  overview,
  media_type,
  genre_ids,
  vote_average,
}) {
  const image = api.getImage(backdrop_path, "w1280");

  return (
    <>
    <Paper
      shadow="xs"
      p="xl"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
      >
      <Overlay 
      zIndex={0}
      gradient="linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%)" />
      <Box className={classes.content}>
      <Title order={3} className={classes.title}>
        {title}
      </Title>
        <Text className={classes.overview} size="sm" lineClamp={2}>
          {overview}
        </Text>
        <div className={classes.overlay}></div>
      </Box>
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
    <Carousel
      align="start"
      loop={true}
      plugins={[autoPlay.current]}
      withIndicators
      className={classes}
    >
      {slides}
    </Carousel>
  );
}

// export default function HeroCarousel() {
//   return (
//     <div>
//       HeroCarousel

//     </div>
//   );
// }

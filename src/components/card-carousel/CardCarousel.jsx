import {
  Box,
  Button,
  HoverCard,
  Overlay,
  RingProgress,
  Text,
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
    <HoverCard openDelay={150} closeDelay={200} position="right">
      <HoverCard.Target>
        <div className={styles.card}>
          <img src={poster} alt="" className={styles["card-poster"]} />
          <Box className={styles.info}>
            <RingProgress
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

// const data = [
//   {
//     backdrop_path: "/dg3OindVAGZBjlT3xYKqIAdukPL.jpg",
//     id: 42009,
//     name: "Black Mirror",
//     original_name: "Black Mirror",
//     overview:
//       "Over the last ten years, technology has transformed almost every aspect of our lives before we've had time to stop and question it. In every home; on every desk; in every palm - a plasma screen; a monitor; a smartphone - a black mirror of our 21st Century existence.",
//     poster_path: "/seN6rRfN0I6n8iDXjlSMk1QjNcq.jpg",
//     media_type: "tv",
//     adult: false,
//     original_language: "en",
//     genre_ids: [10765, 18, 9648],
//     popularity: 58.8503,
//     first_air_date: "2011-12-04",
//     vote_average: 8.288,
//     vote_count: 5316,
//     origin_country: ["GB"],
//   },
//   {
//     backdrop_path: "/hGLywNhy1Fo1rNFHsNZsXGS69B8.jpg",
//     id: 696506,
//     title: "Mickey 17",
//     original_title: "Mickey 17",
//     overview:
//       "Unlikely hero Mickey Barnes finds himself in the extraordinary circumstance of working for an employer who demands the ultimate commitment to the job… to die, for a living.",
//     poster_path: "/edKpE9B5qN3e559OuMCLZdW1iBZ.jpg",
//     media_type: "movie",
//     adult: false,
//     original_language: "en",
//     genre_ids: [878, 35, 12],
//     popularity: 241.9858,
//     release_date: "2025-02-28",
//     video: false,
//     vote_average: 6.955,
//     vote_count: 1331,
//   },
//   {
//     backdrop_path: "/sNx1A3822kEbqeUxvo5A08o4N7o.jpg",
//     id: 1195506,
//     title: "Novocaine",
//     original_title: "Novocaine",
//     overview:
//       "When the girl of his dreams is kidnapped, everyman Nate turns his inability to feel pain into an unexpected strength in his fight to get her back.",
//     poster_path: "/xmMHGz9dVRaMY6rRAlEX4W0Wdhm.jpg",
//     media_type: "movie",
//     adult: false,
//     original_language: "en",
//     genre_ids: [28, 35, 53],
//     popularity: 235.1646,
//     release_date: "2025-03-12",
//     video: false,
//     vote_average: 6.954,
//     vote_count: 219,
//   },
//   {
//     backdrop_path: "/k32XKMjmXMGeydykD32jfER3BVI.jpg",
//     id: 1045938,
//     title: "G20",
//     original_title: "G20",
//     overview:
//       "After the G20 Summit is overtaken by terrorists, President Danielle Sutton must bring all her statecraft and military experience to defend her family and her fellow leaders.",
//     poster_path: "/5EKH6vtNzAvvTjkquT0wQ4lM3JA.jpg",
//     media_type: "movie",
//     adult: false,
//     original_language: "en",
//     genre_ids: [28, 9648, 18],
//     popularity: 11.8882,
//     release_date: "2025-04-09",
//     video: false,
//     vote_average: 7,
//     vote_count: 1,
//   },
//   {
//     backdrop_path: "/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
//     id: 950387,
//     title: "A Minecraft Movie",
//     original_title: "A Minecraft Movie",
//     overview:
//       "Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination. To get back home, they'll have to master this world while embarking on a magical quest with an unexpected, expert crafter, Steve.",
//     poster_path: "/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",
//     media_type: "movie",
//     adult: false,
//     original_language: "en",
//     genre_ids: [10751, 35, 12, 14],
//     popularity: 990.9442,
//     release_date: "2025-03-31",
//     video: false,
//     vote_average: 6.134,
//     vote_count: 354,
//   },
//   {
//     backdrop_path: "/2ZmfL35RNLBErCHblzpRWE8DC6C.jpg",
//     id: 278704,
//     name: "Mobile Suit Gundam GQuuuuuuX",
//     original_name: "機動戦士Gundam GQuuuuuuX（ジークアクス）",
//     overview:
//       "High-school student Amate Yuzuriha lives peacefully in a space colony floating in outer space. But when she meets a war refugee named Nyaan, Amate is drawn into the illegal mobile suit dueling sport known as Clan Battle.",
//     poster_path: "/cbYoRnnHg36vgpERK6TD7zUciph.jpg",
//     media_type: "tv",
//     adult: false,
//     original_language: "ja",
//     genre_ids: [16, 10759, 10765, 18],
//     popularity: 47.2017,
//     first_air_date: "2025-04-09",
//     vote_average: 9.7,
//     vote_count: 3,
//     origin_country: ["JP"],
//   },
//   {
//     backdrop_path: "/sokTOq0zAmPS7wCR4qd4Kca35x7.jpg",
//     id: 69478,
//     name: "The Handmaid's Tale",
//     original_name: "The Handmaid's Tale",
//     overview:
//       "Set in a dystopian future, a woman is forced to live as a concubine under a fundamentalist theocratic dictatorship. A TV adaptation of Margaret Atwood's novel.",
//     poster_path: "/qdWEaWkIQIjANGFeskheXpP0mm1.jpg",
//     media_type: "tv",
//     adult: false,
//     original_language: "en",
//     genre_ids: [18, 10765],
//     popularity: 127.9073,
//     first_air_date: "2017-04-26",
//     vote_average: 8.179,
//     vote_count: 2838,
//     origin_country: ["US"],
//   },
// ];

export default function CardCarousel({ title = "Trending", data }) {
  // console.log(data);

  const slides = data.map((item) => (
    <Carousel.Slide key={item.id}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <>
      <h1>{title}</h1>
      <Carousel
        slideSize={210}
        slideGap="sm"
        align="start"
        containScroll="trimSnaps"
        p={10}
        draggable={false}
        classNames={styles}
      >
        {slides}
      </Carousel>
    </>
  );
}

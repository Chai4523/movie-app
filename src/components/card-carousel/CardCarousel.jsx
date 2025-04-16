import { Box, Button, HoverCard, Paper, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import styles from "./cardCarousel.module.css";
import * as api from "../../utils/apiHelper";

function Card({
  backdrop_path,
  poster_path,
  title,
  name,
  overview,
  media_type,
  genre_ids,
  vote_average,
}) {
  const poster = api.getImage(poster_path, "w342");

  return (
    <HoverCard>
      <HoverCard.Target>
        <div className={styles.card}>
          <img src={poster} alt="" className={styles["card-img"]} />
          <Box className={styles.info}>
            <Text>{title}</Text>
            <Text>{Number.parseFloat(vote_average).toFixed(1)}</Text>
          </Box>
        </div>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text>Some text</Text>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}

const data = [
  {
    backdrop_path: "/dg3OindVAGZBjlT3xYKqIAdukPL.jpg",
    id: 42009,
    name: "Black Mirror",
    original_name: "Black Mirror",
    overview:
      "Over the last ten years, technology has transformed almost every aspect of our lives before we've had time to stop and question it. In every home; on every desk; in every palm - a plasma screen; a monitor; a smartphone - a black mirror of our 21st Century existence.",
    poster_path: "/seN6rRfN0I6n8iDXjlSMk1QjNcq.jpg",
    media_type: "tv",
    adult: false,
    original_language: "en",
    genre_ids: [10765, 18, 9648],
    popularity: 58.8503,
    first_air_date: "2011-12-04",
    vote_average: 8.288,
    vote_count: 5316,
    origin_country: ["GB"],
  },
  {
    backdrop_path: "/hGLywNhy1Fo1rNFHsNZsXGS69B8.jpg",
    id: 696506,
    title: "Mickey 17",
    original_title: "Mickey 17",
    overview:
      "Unlikely hero Mickey Barnes finds himself in the extraordinary circumstance of working for an employer who demands the ultimate commitment to the job… to die, for a living.",
    poster_path: "/edKpE9B5qN3e559OuMCLZdW1iBZ.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [878, 35, 12],
    popularity: 241.9858,
    release_date: "2025-02-28",
    video: false,
    vote_average: 6.955,
    vote_count: 1331,
  },
  {
    backdrop_path: "/sNx1A3822kEbqeUxvo5A08o4N7o.jpg",
    id: 1195506,
    title: "Novocaine",
    original_title: "Novocaine",
    overview:
      "When the girl of his dreams is kidnapped, everyman Nate turns his inability to feel pain into an unexpected strength in his fight to get her back.",
    poster_path: "/xmMHGz9dVRaMY6rRAlEX4W0Wdhm.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [28, 35, 53],
    popularity: 235.1646,
    release_date: "2025-03-12",
    video: false,
    vote_average: 6.954,
    vote_count: 219,
  },
  {
    backdrop_path: "/k32XKMjmXMGeydykD32jfER3BVI.jpg",
    id: 1045938,
    title: "G20",
    original_title: "G20",
    overview:
      "After the G20 Summit is overtaken by terrorists, President Danielle Sutton must bring all her statecraft and military experience to defend her family and her fellow leaders.",
    poster_path: "/5EKH6vtNzAvvTjkquT0wQ4lM3JA.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [28, 9648, 18],
    popularity: 11.8882,
    release_date: "2025-04-09",
    video: false,
    vote_average: 7,
    vote_count: 1,
  },
  {
    backdrop_path: "/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
    id: 950387,
    title: "A Minecraft Movie",
    original_title: "A Minecraft Movie",
    overview:
      "Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination. To get back home, they'll have to master this world while embarking on a magical quest with an unexpected, expert crafter, Steve.",
    poster_path: "/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [10751, 35, 12, 14],
    popularity: 990.9442,
    release_date: "2025-03-31",
    video: false,
    vote_average: 6.134,
    vote_count: 354,
  },
  {
    backdrop_path: "/2ZmfL35RNLBErCHblzpRWE8DC6C.jpg",
    id: 278704,
    name: "Mobile Suit Gundam GQuuuuuuX",
    original_name: "機動戦士Gundam GQuuuuuuX（ジークアクス）",
    overview:
      "High-school student Amate Yuzuriha lives peacefully in a space colony floating in outer space. But when she meets a war refugee named Nyaan, Amate is drawn into the illegal mobile suit dueling sport known as Clan Battle.",
    poster_path: "/cbYoRnnHg36vgpERK6TD7zUciph.jpg",
    media_type: "tv",
    adult: false,
    original_language: "ja",
    genre_ids: [16, 10759, 10765, 18],
    popularity: 47.2017,
    first_air_date: "2025-04-09",
    vote_average: 9.7,
    vote_count: 3,
    origin_country: ["JP"],
  },
  {
    backdrop_path: "/sokTOq0zAmPS7wCR4qd4Kca35x7.jpg",
    id: 69478,
    name: "The Handmaid's Tale",
    original_name: "The Handmaid's Tale",
    overview:
      "Set in a dystopian future, a woman is forced to live as a concubine under a fundamentalist theocratic dictatorship. A TV adaptation of Margaret Atwood's novel.",
    poster_path: "/qdWEaWkIQIjANGFeskheXpP0mm1.jpg",
    media_type: "tv",
    adult: false,
    original_language: "en",
    genre_ids: [18, 10765],
    popularity: 127.9073,
    first_air_date: "2017-04-26",
    vote_average: 8.179,
    vote_count: 2838,
    origin_country: ["US"],
  },
];

export default function CardCarousel() {
  console.log(data);

  const slides = data.map((item) => (
    <Carousel.Slide key={item.id}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <>
      CardCarousel
      <Carousel height={370} slideSize={200} slideGap="sm" align="start" containScroll="trimSnaps">
        {slides}
      </Carousel>
    </>
  );
}

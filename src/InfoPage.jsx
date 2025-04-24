import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Rating,
  ScrollArea,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import styles from "./infoPage.module.css";
import * as api from "./utils/apiHelper";
import PersonCarousel from "./components/person-carousel/PersonCarousel";
import CardCarousel from "./components/card-carousel/CardCarousel";
import { GenreProvider } from "./contexts/GenreContext";

export default function InfoPage() {
  const [media, setMedia] = useState(null);
  const [credit, setCredit] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [toggleKeywords, setToggleKeywords] = useState(false);
  const [toggleKeywordsTxt, setToggleKeywordsTxt] = useState("Show more");

  const movieId = 950387;
  const tvId = 100088;

  useEffect(() => {
    const init = async () => {
      try {
        const mediaRes = await api.fetchMovieById(movieId);
        const creditRes = await api.fetchMovieCreditsById(movieId);
        const keywordRes = await api.fetchMovieKeywordsById(movieId);
        const recommendRes = await api.fetchMovieRecommentdationsById(movieId);
        setMedia(mediaRes);
        setCredit(creditRes);
        setKeyword(keywordRes.keywords);
        setRecommendation(recommendRes);
      } catch (err) {
        setError(err);
        throw new Error("Unable to load info:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (media && credit && keyword && recommendation) {
      console.log("Media updated:", media);
      console.log("Credit updated:", credit);
      console.log("keyword updated:", keyword);
      console.log("recommendation updated:", recommendation);
    }
  }, [media, credit, keyword, recommendation]);

  const poster = media ? api.getImage(media.poster_path, "w342") : null;
  const backdrop = media ? api.getImage(media.backdrop_path, "w780") : null;
  const keywordsTrimmed = keyword ? keyword.slice(0, 3) : null;

  const onToggleKeywords = () => {
    if (!toggleKeywords) {
      setToggleKeywordsTxt("Show less");
    } else {
      setToggleKeywordsTxt("Show more");
    }
    setToggleKeywords(!toggleKeywords);
  };

  const formatLabels = (labels) =>
    labels
      ? labels.map((label) => (
          <span key={label.id} className={styles.label}>
            {label.name}
          </span>
        ))
      : null;

  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const mins = runtime % 60;

    let output = "";
    if (hours > 0) output += `${hours} hour${hours > 1 ? "s" : ""}`;
    if (mins > 0) output += ` ${mins} minutes`;

    return output || "N/A";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatCurrency = (value) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  return (
    <>
      {!loading && (
        <div>
          <img
            src={backdrop}
            alt={`a backdrop of ${media.title}`}
            className={styles.backdrop}
          />
          <div className={styles["info-container"]}>
            <div className={styles.left}>
              <img
                src={poster}
                alt={`a poster of ${media.title}`}
                className={styles.poster}
              />
            </div>
            <ScrollArea className={styles.right} type="auto" offsetScrollbars>
              <Title c="white">{media.title}</Title>
              <Text fs={"italic"} opacity={0.8} mt={5} mb={15}>
                {media.tagline}
              </Text>
              <div className={styles.row}>{formatLabels(media.genres)}</div>

              <div className={`${styles.row} ${styles.ratings}`}>
                <Tooltip
                  label={Number.parseFloat(media.vote_average).toFixed(1)}
                  position="right"
                  color="black"
                  transitionProps={{ transition: "slide-right", duration: 300 }}
                >
                  <Rating
                    value={(Number.parseFloat(media.vote_average) / 2).toFixed(
                      1
                    )}
                    fractions={5}
                    size={"xl"}
                    readOnly
                  />
                </Tooltip>
                <Text>Number of Votes: {media.vote_count}</Text>
              </div>

              <Text fz={"h2"} c={"white"} fw={700} mt={27}>
                Overview
              </Text>
              <Text fz={"h4"} mb={20}>
                {media.overview}
              </Text>

              <Text className={styles["border-btm"]}>
                <span className={styles["label-white"]}>Ratings: </span>
                {media.adult
                  ? "Contains adult content"
                  : "Suitable for all audiences"}
              </Text>
              <Text pt={15} className={styles["border-btm"]}>
                <span className={styles["label-white"]}>Running time: </span>
                {formatRuntime(media.runtime)}
              </Text>
              <Box pt={15} className={`${styles.row} ${styles["border-btm"]}`}>
                <Text>
                  <span className={styles["label-white"]}>Status: </span>
                  {media.status}
                </Text>
                <Text>
                  <span className={styles["label-white"]}>Release Date: </span>
                  {formatDate(media.release_date)}
                </Text>
              </Box>
              <Box pt={15} className={`${styles.row} ${styles["border-btm"]}`}>
                <Text>
                  <span className={styles["label-white"]}>Budget: </span>
                  {formatCurrency(media.budget)}
                </Text>
                <Text>
                  <span className={styles["label-white"]}>Revenue: </span>
                  {formatCurrency(media.revenue)}
                </Text>
              </Box>
              <Text pt={15} className={styles["border-btm"]}>
                <span className={styles["label-white"]}>Origin Country: </span>
                {media.origin_country}
              </Text>
              <Box pt={15} className={`${styles.row} ${styles["border-btm"]}`}>
                <Text>
                  <span className={styles["label-white"]}>Keywords: </span>
                </Text>

                <Box className={styles["keywords-container"]}>
                  {formatLabels(toggleKeywords ? keyword : keywordsTrimmed)}
                  <Button
                    onClick={() => onToggleKeywords()}
                    variant="light"
                    color="gray"
                  >
                    {toggleKeywordsTxt}
                  </Button>
                </Box>
              </Box>
            </ScrollArea>
          </div>

          {credit && <PersonCarousel data={credit.cast} />}
          <GenreProvider>
            {recommendation && (
              <CardCarousel
                data={recommendation.results}
                disabled={true}
                title="Recommendations"
              />
            )}
          </GenreProvider>
        </div>
      )}
    </>
  );
}

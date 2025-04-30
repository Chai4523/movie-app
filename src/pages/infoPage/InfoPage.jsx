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
import * as api from "../../utils/apiHelper";
import PersonCarousel from "../../components/person-carousel/PersonCarousel";
import MediaCarousel from "../../components/media-carousel/MediaCarousel";
import Comment from "../../components/comment/Comment";
import { useLoaderData } from "react-router-dom";

export default function InfoPage() {
  const [toggleKeywords, setToggleKeywords] = useState(false);
  const [toggleKeywordsTxt, setToggleKeywordsTxt] = useState("Show more");

  const {
    id,
    mediaType,
    media,
    credit,
    keyword,
    recommendation,
    review,
    rating,
  } = useLoaderData()

  // TODO: reviews pagination, cast carousel hide controls if unecessary

  const poster = media ? api.getImage(media.poster_path, "w342") : null;
  const backdrop = media ? api.getImage(media.backdrop_path, "w780") : null;
  const keywordsTrimmed = keyword ? keyword.slice(0, 3) : null;
  const displayTitle = media ? media.title || media.name : null;
  const displayDate = media ? media.release_date || media.first_air_date : null;

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
              <Title c="white">{displayTitle}</Title>
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
                {rating}
              </Text>
              {media.number_of_episodes && (
                <Box
                  pt={15}
                  className={`${styles.row} ${styles["border-btm"]}`}
                >
                  <Text>
                    <span className={styles["label-white"]}>Seasons: </span>
                    {media.number_of_seasons}
                  </Text>
                  <Text>
                    <span className={styles["label-white"]}>Episodes: </span>
                    {media.number_of_episodes}
                  </Text>
                </Box>
              )}
              {media.runtime && (
                <Text pt={15} className={styles["border-btm"]}>
                  <span className={styles["label-white"]}>Running time: </span>
                  {formatRuntime(media.runtime)}
                </Text>
              )}
              <Box pt={15} className={`${styles.row} ${styles["border-btm"]}`}>
                <Text>
                  <span className={styles["label-white"]}>Status: </span>
                  {media.status}
                </Text>
                <Text>
                  <span className={styles["label-white"]}>Release Date: </span>
                  {formatDate(displayDate)}
                </Text>
              </Box>
              {media.budget && (
                <Box
                  pt={15}
                  className={`${styles.row} ${styles["border-btm"]}`}
                >
                  <Text>
                    <span className={styles["label-white"]}>Budget: </span>
                    {formatCurrency(media.budget)}
                  </Text>
                  <Text>
                    <span className={styles["label-white"]}>Revenue: </span>
                    {formatCurrency(media.revenue)}
                  </Text>
                </Box>
              )}
              {media.networks && (
                <Text pt={15} className={styles["border-btm"]}>
                  <span className={styles["label-white"]}>Networks: </span>
                  {media.networks.map((n) => n.name).join(", ")}
                </Text>
              )}
              {media.created_by && (
                <Text pt={15} className={styles["border-btm"]}>
                  <span className={styles["label-white"]}>Creator: </span>
                  {media.created_by.map((c) => c.name).join(", ")}
                </Text>
              )}
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
          {review && <Comment data={review} />}
          {recommendation && (
            <MediaCarousel
              data={recommendation.results}
              disabled={true}
              title="Recommendations"
            />
          )}
        </div>
    </>
  );
}

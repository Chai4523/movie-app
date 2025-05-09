import { Link } from "react-router-dom";
import * as api from "../../utils/apiHelper";

import styles from "./mediaCarousel.module.css";
import { Box, RingProgress, Text } from "@mantine/core";

export default function MediaCard(data) {
  const {
    id,
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
    disabled,
  } = data;
  console.log("card", data)

  const displayTitle = title || name;
  const poster = api.getImage(poster_path, "w342");
  const releaseDate = release_date || first_air_date;

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

  const displayDate = releaseDate ? formatDate(releaseDate) : "Date N/A";

  const formatMediaType = (media_type) => {
    if (media_type == "tv") return "TV";
    return (
      String(media_type).charAt(0).toUpperCase() + String(media_type).slice(1)
    );
  };

  return (
    <Link className={styles.card} to={`/${media_type}/${id}`}>
      <img src={poster} alt="" className={styles["card-poster"]} />
      <Box className={styles.info}>
        <RingProgress
          ml={5}
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
    </Link>
  );
}

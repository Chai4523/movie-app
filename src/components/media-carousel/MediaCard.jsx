import { Link } from "react-router-dom";
import * as api from "../../utils/apiHelper";

import styles from "./mediaCarousel.module.css";
import { Box, RingProgress, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import ImgPlaceholder from "../placeholder/ImgPlaceholder";
import { formatDate, formatMediaType } from "../../utils/formatUtils";

export default function MediaCard(props) {
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
  } = props;

  const ringColor = (vote_average) => {
    if (vote_average > 7) return "green";
    if (vote_average > 5) return "yellow";
    return "red";
  };

  const displayTitle = title || name;
  const poster = api.getImage(poster_path, "w342");
  const releaseDate = release_date || first_air_date;
  const displayDate = releaseDate ? formatDate(releaseDate, "short") : "Date N/A";
  const useMobile = useMediaQuery("(max-width: 770px)");
  const [isMobile, setIsMobile] = useState(useMobile);

  useEffect(() => {
    setIsMobile(useMobile);
  }, [useMobile]);

  return (
    <Link className={styles.card} to={`/${media_type}/${id}`}>
      {poster ? (
        <img src={poster} alt="" className={styles["card-poster"]} />
      ) : (
        <ImgPlaceholder type="poster" variant="media" />
      )}
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
        <Text truncate="end" maw={isMobile ? 140 : 196} c={"white"}>
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

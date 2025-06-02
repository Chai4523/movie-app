import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./mediaCarousel.module.css";
import { Box, RingProgress, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ImgPlaceholder from "../placeholder/ImgPlaceholder";
import { formatDate, formatMediaType } from "../../utils/formatUtils";

export default function MediaCard(props) {
  const {
    id,
    backdrop_path,
    poster_path,
    title,
    overview,
    type,
    genre_ids,
    score,
    first_air_date,
    release_date,
  } = props;

  const ringColor = (score) => {
    if (score > 7) return "green";
    if (score > 5) return "yellow";
    return "red";
  };

  const useMobile = useMediaQuery("(max-width: 770px)");
  const [isMobile, setIsMobile] = useState(useMobile);

  useEffect(() => {
    setIsMobile(useMobile);
  }, [useMobile]);

  return (
    <Link className={styles.card} to={`/${type}/${id}`}>
      {poster_path ? (
        <img src={poster_path} alt="" className={styles["card-poster"]} />
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
            { value: score * 10, color: ringColor(score) },
          ]}
          label={
            <Text c="white" fw={500} ta="center" size="xs">
              {Number.parseFloat(score).toFixed(1)}
            </Text>
          }
        />
        <Text truncate="end" maw={isMobile ? 140 : 196} c={"white"}>
          {title}
        </Text>
        <Box className={styles["info-row"]}>
          <Text>{release_date}</Text>
          <span>•</span>
          <Text>{formatMediaType(type)}</Text>
        </Box>
      </Box>
    </Link>
  );
}

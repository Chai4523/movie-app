import { Box, Button, Overlay, Text, Tooltip } from "@mantine/core";
import { useGenres } from "../../contexts/GenreContext";
import "@mantine/core/styles.css";
import styles from "./mediaCarousel.module.css";
import * as api from "../../utils/apiHelper";

import { FaStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


export default function HoverInfo(props) {
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
  } = props;

  const displayTitle = title || name;
  const backdrop = api.getImage(backdrop_path, "w780");
  const { getGenreByIds, loading } = useGenres();
  const navigate = useNavigate();

  const iconInfo = <FaCircleInfo size={18} />;

  return (
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
            onClick={() => navigate(`/${media_type}/${id}`)}
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
  );
}

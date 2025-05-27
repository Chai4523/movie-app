import { Box } from "@mantine/core";
import styles from "./infoPage.module.css";
import PersonCarousel from "../../components/person-carousel/PersonCarousel";
import MediaCarousel from "../../components/media-carousel/MediaCarousel";
import Comment from "../../components/comment/Comment";
import MediaInfo from "../../components/media-info/MediaInfo";
import { useLoaderData } from "react-router-dom";

export default function InfoPage() {
  const {
    id,
    mediaType,
    media,
    credit,
    keyword,
    recommendation,
    review,
    rating,
  } = useLoaderData();

  // TODO: empty recommendation handling
  return (
    <Box>
      <MediaInfo data={{ media, keyword, rating }} />
      {credit && <PersonCarousel data={credit.cast} />}
      {review && <Comment data={review} mediaType={mediaType} />}
      {recommendation && (
        <MediaCarousel
          data={recommendation.results}
          disabled={true}
          title="Recommendations"
        />
      )}
    </Box>
  );
}

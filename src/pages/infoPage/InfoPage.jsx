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

  // TODO: reviews pagination, cast carousel hide controls if unecessary
  // TODO: empty review placeholder handling
  // TODO: empty recommendation handling
  // TODO: empty cast handling
  // TODO: scroll to top on page load for all scrollable area
  // TODO: image not available http://localhost:5173/movie/119994(info), http://localhost:5173/movie/1001414(recommendations)
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

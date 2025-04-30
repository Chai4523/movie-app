import * as api from "../../utils/apiHelper";

export async function infoLoader({ params }) {
  const { id, mediaType } = params;

  try {
    const [media, credit, keyword, recommendation, review, rating] =
      await Promise.all([
        api.fetchMediaById(id, mediaType),
        api.fetchCreditsById(id, mediaType),
        api.fetchKeywordsById(id, mediaType),
        api.fetchRecommentdationsById(id, mediaType),
        api.fetchReviewsById(id, mediaType),
        api.getMediaRating(id, mediaType),
      ]);

    return {
      id,
      mediaType,
      media,
      credit,
      keyword: mediaType === "movie" ? keyword.keywords : keyword.results,
      recommendation,
      review,
      rating: api.extractRating(rating, mediaType),
    };
  } catch (error) {
    console.error("Failed to load media information", error);
    throw new Response("Failed to load media information.", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

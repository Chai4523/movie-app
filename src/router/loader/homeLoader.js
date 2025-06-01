import * as api from "../../utils/apiHelper";
import * as aniApi from "../../api/anilistApi"

export async function homeLoader() {
  try {
    const [trendingAll, trendingMovie, trendingTv, trendingAnime, trendingManga] = await Promise.all([
      api.fetchTrendingAll(),
      api.fetchTrendingMovie(),
      api.fetchTrendingTv(),
      aniApi.fetchTrendingAnime(),
      aniApi.fetchTrendingManga(),
    ]);

    return {
      trendingAll,
      trendingMovie,
      trendingTv,
      trendingAnime,
      trendingManga,
    };
  } catch (error) {
    console.error("Failed to load home information", error);
    throw new Response("Failed to load home information.", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

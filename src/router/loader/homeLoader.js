import * as api from "../../utils/apiHelper";

export async function homeLoader() {
  try {
    const [trendingAll, trendingMovie, trendingTv] = await Promise.all([
      api.fetchTrendingAll(),
      api.fetchTrendingMovie(),
      api.fetchTrendingTv(),
    ]);

    return {
      trendingAll,
      trendingMovie,
      trendingTv,
    };
  } catch (error) {
    console.error("Failed to load home information", error);
    throw new Response("Failed to load home information.", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

import * as api from "../../utils/apiHelper";

export async function searchLoader({ params }) {
  // const url = new URL(params.url)
  // const genre = url.searchParams.get("genre")

  try {
    const [{ page, results, total_pages, total_results }] = await Promise.all([
      api.searchMovies(),
    ]);

    return { page, results, total_pages, total_results };
  } catch (error) {
    console.error("Failed to load search information", error);
    throw new Response("Failed to load search information.", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

import HeroCarousel from "../../components/hero-carousel/HeroCarousel.jsx";
import MediaCarousel from "../../components/media-carousel/MediaCarousel.jsx";
import { useLoaderData } from "react-router-dom";

export default function Home() {
  const { trendingAll, trendingMovie, trendingTv } = useLoaderData();

  return (
    <>
      {trendingAll && <HeroCarousel data={trendingAll.results} />}
      {trendingMovie && (
        <MediaCarousel data={trendingMovie.results} title="Trending Movie" />
      )}
      {trendingTv && (
        <MediaCarousel data={trendingTv.results} title="Trending TV Shows" />
      )}
    </>
  );
}

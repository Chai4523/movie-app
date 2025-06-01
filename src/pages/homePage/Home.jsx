import HeroCarousel from "../../components/hero-carousel/HeroCarousel.jsx";
import MediaCarousel from "../../components/media-carousel/MediaCarousel.jsx";
import { useLoaderData } from "react-router-dom";
import { useGenres } from "../../contexts/GenreContext.jsx";
import { mapFromAniList, mapFromTMDB } from "../../utils/dataMapper.js";

export default function Home() {
  const {
    trendingAll,
    trendingMovie,
    trendingTv,
    trendingAnime,
    trendingManga,
  } = useLoaderData();

  const { getGenreByIds } = useGenres();
  const tmdbHeroData = trendingAll.results.map((item) =>
    mapFromTMDB(item, getGenreByIds)
  );
  console.log("home", trendingAnime.Page.media);
  const aniHeroData = trendingAnime.Page.media.map((item) => 
    mapFromAniList(item)
  );

  return (
    <>
      {trendingAll && <HeroCarousel data={tmdbHeroData} />}
      {trendingMovie && (
        <MediaCarousel data={trendingMovie.results} title="Trending Movie" />
      )}
      {trendingTv && (
        <MediaCarousel data={trendingTv.results} title="Trending TV Shows" />
      )}
      {trendingAnime && <HeroCarousel data={aniHeroData} />}
    </>
  );
}

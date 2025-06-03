import HeroCarousel from "../../components/hero-carousel/HeroCarousel.jsx";
import MediaCarousel from "../../components/media-carousel/MediaCarousel.jsx";
import { useLoaderData } from "react-router-dom";
import { useGenres } from "../../contexts/GenreContext.jsx";
import {
  mapHeroFromAniList,
  mapHeroFromTMDB,
  mapMediaCarouselFromAniList,
  mapMediaCarouselFromTMDB,
} from "../../utils/dataMapper.js";

export default function Home() {
  const {
    trendingAll,
    trendingMovie,
    trendingTv,
    trendingAnime,
    trendingManga,
  } = useLoaderData();

  // TODO: fix load time 
  const { getGenreByIds } = useGenres();
  const tmdbHeroData = trendingAll.results.map((item) =>
    mapHeroFromTMDB(item, getGenreByIds)
  );
  const movieCarouselData = trendingMovie.results.map((item) =>
    mapMediaCarouselFromTMDB(item, getGenreByIds)
  );
  const tvCarouselData = trendingTv.results.map((item) =>
    mapMediaCarouselFromTMDB(item, getGenreByIds)
  );
  const animeCarouselData = trendingAnime.Page.media.map((item) =>
    mapMediaCarouselFromAniList(item)
  );
  const mangaCarouselData = trendingManga.Page.media.map((item) =>
    mapMediaCarouselFromAniList(item)
  );
  const aniHeroData = animeCarouselData.filter(
    (item) => item.backdrop_path
  );

  return (
    <>
      {trendingAll && <HeroCarousel data={tmdbHeroData} />}
      {trendingMovie && (
        <MediaCarousel data={movieCarouselData} title="Trending Movie" />
      )}
      {trendingTv && (
        <MediaCarousel data={tvCarouselData} title="Trending TV Shows" />
      )}
      {trendingAnime && <HeroCarousel data={aniHeroData} />}
      {trendingAnime && (
        <MediaCarousel data={animeCarouselData} title="Trending Anime" />
      )}
      {trendingManga && (
        <MediaCarousel data={mangaCarouselData} title="Trending Manga" />
      )}
    </>
  );
}

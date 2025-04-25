import React from "react";
import * as api from "./utils/apiHelper.js";
import { useEffect } from "react";
import { useState } from "react";
import HeroCarousel from "./components/hero-carousel/HeroCarousel.jsx";
import MediaCarousel from "./components/media-carousel/MediaCarousel.jsx";
import { GenreProvider } from "./contexts/GenreContext.jsx";

export default function Home() {
  const [trendingAll, setTrendingAll] = useState(null);
  const [trendingMovie, setTrendingMovie] = useState(null);
  const [trendingTv, setTrendingTv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const trendingAllRes = await api.fetchTrendingAll();
        const trendingMovieRes = await api.fetchTrendingMovie();
        const trendingTvRes = await api.fetchTrendingTv();
        setTrendingAll(trendingAllRes.results);
        setTrendingMovie(trendingMovieRes.results);
        setTrendingTv(trendingTvRes.results);
      } catch (err) {
        setError(err);
        throw new Error("Something went wrong:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    !loading && (
      <>
        {trendingAll && <HeroCarousel data={trendingAll} />}
        {trendingMovie && (
          <MediaCarousel data={trendingMovie} title="Trending Movie" />
        )}
        {trendingTv && (
          <MediaCarousel data={trendingTv} title="Trending TV Shows" />
        )}
      </>
    )
  );
}

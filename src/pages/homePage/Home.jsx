import React from "react";
import HeroCarousel from "../../components/hero-carousel/HeroCarousel.jsx";
import MediaCarousel from "../../components/media-carousel/MediaCarousel.jsx";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function Home() {
  const { trendingAll, trendingMovie, trendingTv } = useLoaderData();

  return (
    <>
      {trendingAll && <HeroCarousel data={trendingAll.results} />}
      {trendingMovie && (
        <div style={{ marginTop: "20px" }}>
          <MediaCarousel data={trendingMovie.results} title="Trending Movie" />
        </div>
      )}
      {trendingTv && (
        <MediaCarousel data={trendingTv.results} title="Trending TV Shows" />
      )}
    </>
  );
}

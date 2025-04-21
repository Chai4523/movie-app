import React from "react";
import * as api from "./utils/apiHelper.js";
import { useEffect } from "react";
import { useState } from "react";
import HeroCarousel from "./components/hero-carousel/HeroCarousel.jsx";
import CardCarousel from "./components/card-carousel/CardCarousel.jsx";
import { GenreProvider } from "./contexts/GenreContext.jsx";

export default function Home() {
  const [trendingAll, setTrendingAll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const trendingAllRes = await api.fetchTrendingAll();
        setTrendingAll(trendingAllRes.results);

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false)
      }
    };

    init();
  }, []);

  return (
    <div>
      <GenreProvider>
        {trendingAll && <HeroCarousel data={trendingAll} />}
        <CardCarousel />
      </GenreProvider>
    </div>
  );
}

import React from "react";
import * as api from "./utils/apiHelper.js";
import { useEffect } from "react";
import { useState } from "react";
import "./app.css";
import HeroCarousel from "./components/hero-carousel/HeroCarousel.jsx";
import CardCarousel from "./components/card-carousel/CardCarousel.jsx";

export default function Home() {
  const [trendingAll, setTrendingAll] = useState(null);
  const [tvGenre, setTvGenre] = useState([]);
  const [movieGenre, setMovieGenre] = useState([]);
  const [tvGenreMap, setTvGenreMap] = useState(new Map());
  const [movieGenreMap, setMovieGenreMap] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const trendingAllRes = await api.fetchTrendingAll();
        const tvGenreRes = await api.fetchTvGenre();
        const movieGenreRes = await api.fetchMovieGenre();
        setTrendingAll(trendingAllRes.results);
        setTvGenre(tvGenreRes.genres);
        setMovieGenre(movieGenreRes.genres);

        // console.log(trendingAll);
        // console.log(tvGenre);
        // console.log(movieGenre);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    setTvGenreMap(new Map(tvGenre.map((genre) => [genre.id, genre.name])));
    setMovieGenreMap(
      new Map(movieGenre.map((genre) => [genre.id, genre.name]))
    );
  }, [tvGenre, movieGenre]);

  function getGenreById(ids, mediaType) {
    const genreMap = mediaType === "tv" ? tvGenreMap : movieGenreMap;

    if (Array.isArray(ids)) {
      return ids.map((id) => genreMap.get(id));
    } else {
      return genreMap.get(ids);
    }
  }

  return (
    <div>
      {/* {trendingAll &&
        trendingAll.map((data, index) => {
          let title = null;

          if (data.media_type === "movie") {
            title = data.title;
          } else {
            title = data.name;
          }

          return (
            <div key={index}>
              <h3>{title}</h3>
              <p>{getGenreById(data.genre_ids, data.media_type).join(", ")}</p>
              <p>{data.vote_average}</p>
              <p>{data.overview}</p>
              <img src={api.getImage(data.backdrop_path, "w1280")} alt="" />
            </div>
          );
        })} */}
      {trendingAll && <HeroCarousel data={trendingAll}/>}
      <CardCarousel />
    </div>
  );
}

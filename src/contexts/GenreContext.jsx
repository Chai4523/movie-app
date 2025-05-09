import { createContext, useEffect } from "react";
import * as api from "../utils/apiHelper";
import { useState } from "react";
import { useContext } from "react";

const GenreContext = createContext();

export const useGenres = () => {
  const context = useContext(GenreContext);

  if (!context) {
    throw new Error("useGenres must be used within GenreProvider");
  }

  return context;
};

export const GenreProvider = ({ children }) => {
  const [tvGenre, setTvGenre] = useState([]);
  const [movieGenre, setMovieGenre] = useState([]);
  const [tmdbGenreMap, setTmdbGenreMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const tvGenreRes = await api.fetchTvGenre();
        const movieGenreRes = await api.fetchMovieGenre();

        const tmdbGenre = [
          ...(tvGenreRes.genres || []),
          ...(movieGenreRes.genres || []),
        ];
        setTvGenre(tvGenreRes.genres);
        setMovieGenre(movieGenreRes.genres);

        const tmdbMap = {};
        for (const genre of tmdbGenre) {
          tmdbMap[genre.id] = genre.name;
        }

        setTmdbGenreMap(tmdbMap);
      } catch (error) {
        console.error("Failed to fetch genre:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  function getGenreByIds(ids) {
    // const genreMap = mediaType === "tmdb" ? tmdbGenreMap : undefined;
    const genreMap = tmdbGenreMap;

    if (Array.isArray(ids)) {
      return ids.map((id) => genreMap[id] || "Unknown").join(", ");
    } else {
      return genreMap[id] || "Unknown";
    }
  }

  function getTvGenre() {
    return tvGenre;
  }

  function getMovieGenre() {
    return movieGenre;
  }

  return (
    <GenreContext.Provider
      value={{ getGenreByIds, getTvGenre, getMovieGenre, loading }}
    >
      {children}
    </GenreContext.Provider>
  );
};

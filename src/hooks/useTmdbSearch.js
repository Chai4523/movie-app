import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { searchMedia, searchMediaByGenre } from "../utils/apiHelper";

const useTmdbSearch = (query, genreIds = [], page = 1, mediaType) => {
  const debouncedQuery = useDebounce(query);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res;
        if (debouncedQuery) {
          const unfilteredRes = await searchMedia(debouncedQuery, page, mediaType);
          res = genreIds.length
            ? unfilteredRes.results.filter((movie) =>
                genreIds.some((id) => movie.genre_ids.includes(Number(id)))
              )
            : unfilteredRes;
        } else {
          const genreString = genreIds.join(", ");
          res = await searchMediaByGenre(genreString, page, mediaType);
        }
        setData(res.results || []);
        setTotalPages(res.total_pages);
        setError(null);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery, genreIds, page, mediaType]);

  return {
    data,
    totalPages,
    loading,
    error,
  };
};

export default useTmdbSearch;

import { useEffect, useState } from "react";
import * as api from "./utils/apiHelper";
import styles from "./infoPage.module.css";
import { Text } from "@mantine/core";


export default function InfoPage() {
  const [media, setMedia] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const movieId = 950387;
  const tvId = 100088;

  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.fetchMovieById(movieId);
        setMedia(res);
      } catch (err) {
        setError(err);
        throw new Error("Unable to load info:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (media) {
      console.log("Media updated:", media);
    }
  }, [media]);

  const poster = media ? api.getImage(media.poster_path, "w342") : null;
  const backdrop = media ? api.getImage(media.backdrop_path, "w780") : null;
  const genres = media ? (media.genres).map((genre) => genre.name).join(", ") : null

  return (
    <>
      {!loading && (
        <div className={styles["info-container"]}>
          InfoPage
          <div className={styles.left}>
            <img src={poster} alt={`a poster of ${media.title}`} />
          </div>
          <div className={styles.right}>
            <h1>{media.title}</h1>
            <h2>{media.tagline}</h2>
            <Text>{genres}</Text>
            <Text>vote_average: {vote_average}</Text>
            <Text>vote_count: {vote_count}</Text>
            <Text>Duration: {runtime}</Text>
            <Text>Status: {status}</Text>
            <Text>revenue: {revenue}</Text>
            <Text>release_date: {release_date}</Text>
            <Text>overview: {overview}</Text>
            <Text>origin_country: {origin_country}</Text>
            <Text>budget: {budget}</Text>
            <Text>adult: {adult}</Text>
          </div>
        </div>
      )}
    </>
  );
}

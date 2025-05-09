import { useState, useEffect } from "react";
import {
  Box,
  Chip,
  CloseButton,
  Group,
  SegmentedControl,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useGenres } from "../../contexts/GenreContext";
import { useLoaderData } from "react-router-dom";
import styles from "./searchPage.module.css";
import MediaCard from "../../components/media-carousel/MediaCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [mediaType, setMediaType] = useState("movie");
  const [genre, setGenre] = useState([]);
  const [filter, setFilter] = useState([]);
  const { page, results, total_pages, total_results } = useLoaderData();
  const { getTvGenre, getMovieGenre, loading } = useGenres();
  const displayMediaType = mediaType === "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    if (!loading) {
      setGenre(mediaType === "movie" ? getMovieGenre() : getTvGenre());
      setFilter([]);
    }
  }, [mediaType, loading]);

  return (
    <Box className={styles.container}>
      <TextInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && setPage(1)}
        placeholder="Search..."
        size="md"
        className={styles.input}
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => setQuery("")}
            style={{ display: query ? undefined : "none" }}
          />
        }
      />
      <Box className={styles.row}>
        <Title>Explore {displayMediaType}</Title>
        <SegmentedControl
          value={mediaType}
          size="md"
          onChange={setMediaType}
          data={[
            { label: "Movies", value: "movie" },
            { label: "TV Shows", value: "tv" },
          ]}
        />
      </Box>
      <Chip.Group multiple value={filter} onChange={setFilter}>
        <Group justify="flex-start" mt={30} mb={30}>
          {genre.map((data) => (
            <Chip
              key={data.id}
              radius="md"
              size="md"
              value={data.id.toString()}
            >
              {data.name}
            </Chip>
          ))}
        </Group>
      </Chip.Group>
      {results && (
        <Box className={styles["search-results"]}>
          {results.map((res) => (
            <MediaCard {...res} />
          ))}
        </Box>
      )}
    </Box>
  );
}

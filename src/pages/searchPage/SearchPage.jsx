import { useState, useEffect } from "react";
import {
  Box,
  Chip,
  CloseButton,
  Group,
  Loader,
  Pagination,
  SegmentedControl,
  TextInput,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useGenres } from "../../contexts/GenreContext";
import styles from "./searchPage.module.css";
import MediaCard from "../../components/media-carousel/MediaCard";
import useTmdbSearch from "../../hooks/useTmdbSearch";
import { useNavigate, useParams } from "react-router-dom";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { getTvGenre, getMovieGenre, loading: genreLoading } = useGenres();
  const { mediaType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!genreLoading) {
      setGenre(mediaType === "movie" ? getMovieGenre() : getTvGenre());
      setSelectedGenres([]);
      setPage(1);
    }
  }, [mediaType, genreLoading]);

  const {
    data,
    loading: searchLoading,
    totalPages,
  } = useTmdbSearch(query, selectedGenres, page, mediaType);
  const displayMediaType = mediaType === "movie" ? "Movies" : "TV Shows";

  return (
    <Box className={styles.container}>
      <TextInput
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
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
      <Box className={styles["filter-header"]}>
        <Title>Explore {displayMediaType}</Title>
        <SegmentedControl
          value={mediaType}
          size="md"
          onChange={(value) => {
            navigate(`/search/${value}`);
          }}
          data={[
            { label: "Movies", value: "movie" },
            { label: "TV Shows", value: "tv" },
          ]}
        />
      </Box>
      <Chip.Group
        multiple
        value={selectedGenres}
        onChange={(value) => {
          setSelectedGenres(value);
          setPage(1);
        }}
      >
        <Group justify="flex-start" mt={30} mb={30} className={styles.grid}>
          {genre.map((data) => (
            <Chip
              key={data.id}
              radius="md"
              size="xl"
              value={data.id.toString()}
              className={styles.chip}
            >
              {data.name}
            </Chip>
          ))}
        </Group>
      </Chip.Group>
      {searchLoading && (
        <Box className={`${styles.row} ${styles["jc-center"]}`}>
          <Loader type="dots" color="white" size="xl" />
        </Box>
      )}
      {data && (
        <Box className={styles["search-results"]}>
          {data.map((res) => (
            <MediaCard key={res.id} {...res} media_type={mediaType} />
          ))}
        </Box>
      )}
      <Box className={`${styles.row} ${styles.pagination}`}>
        <Pagination
          total={totalPages}
          value={page}
          onChange={setPage}
          hideWithOnePage
        />
      </Box>
    </Box>
  );
}

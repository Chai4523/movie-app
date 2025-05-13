import * as dataSample from "./data";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_BASE_IMG_URL = "https://image.tmdb.org/t/p";
const JIKAN_BASE_URL = "";

async function fetchData(url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function fetchTrendingAll() {
  const url = `${TMDB_BASE_URL}/trending/all/day?language=en-US`;
  return fetchData(url);
}

export async function fetchTrendingMovie() {
  const url = `${TMDB_BASE_URL}/trending/movie/day?language=en-US`;
  return fetchData(url);
}

export async function fetchTrendingTv() {
  const url = `${TMDB_BASE_URL}/trending/tv/day?language=en-US`;
  return fetchData(url);
}

export async function fetchTvGenre() {
  const url = `${TMDB_BASE_URL}/genre/tv/list?language=en`;
  return fetchData(url);
}
export async function fetchMovieGenre() {
  const url = `${TMDB_BASE_URL}/genre/movie/list?language=en`;
  return fetchData(url);
}

export async function fetchMediaById(id, mediaType) {
  const url = `${TMDB_BASE_URL}/${mediaType}/${id}?language=en-US`;
  return fetchData(url);
}

export async function fetchCreditsById(id, mediaType) {
  const url = `${TMDB_BASE_URL}/${mediaType}/${id}/credits?language=en-US`;
  return fetchData(url);
}

export async function fetchKeywordsById(id, mediaType) {
  const url = `${TMDB_BASE_URL}/${mediaType}/${id}/keywords`;
  return fetchData(url);
}

export async function fetchRecommentdationsById(id, mediaType) {
  const url = `${TMDB_BASE_URL}/${mediaType}/${id}/recommendations?language=en-US&page=1`;
  return fetchData(url);
}

export async function fetchReviewsById(id, mediaType) {
  const url = `${TMDB_BASE_URL}/${mediaType}/${id}/reviews?language=en-US&page=1`;
  return fetchData(url);
}

export async function getMediaRating(id, mediaType) {
  const url = `${TMDB_BASE_URL}/${mediaType}/${id}/release_dates`;
  return fetchData(url);
}

export async function searchMedia(query = "", page = 1, mediaType) {
  const url = `${TMDB_BASE_URL}/search/${mediaType}?query=${encodeURIComponent(
    query
  )}&page=${page}`;
  return fetchData(url);
}

export async function searchMediaByGenre(genre, page = 1, mediaType) {
  const genreString = genre ? `&with_genres=${genre}` : "";
  const url = `${TMDB_BASE_URL}/discover/${mediaType}?include_video=false&page=${page}&sort_by=popularity.desc${genreString}`;
  return fetchData(url);
}

export function extractRating(data, mediaType, countryCode = "US") {
  if (mediaType === "movie") {
    const entry = data.results.find((r) => r.iso_3166_1 === countryCode);
    const certification = entry?.release_dates.find(
      (r) => r.certification
    )?.certification;
    return certification || "NR";
  } else if (mediaType === "tv") {
    const entry = data.results.find((r) => r.iso_3166_1 === countryCode);
    return entry?.rating || "NR";
  }
  return "NR";
}

export function getImage(imgPath, size) {
  return imgPath ? `${TMDB_BASE_IMG_URL}/${size}/${imgPath}` : null;
}

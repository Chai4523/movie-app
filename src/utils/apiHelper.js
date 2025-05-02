import * as dataSample from "./data";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const TMDB_BASE_URL = "";
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
  const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
  return fetchData(url);
}

export async function fetchTrendingMovie() {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  return fetchData(url);
}

export async function fetchTrendingTv() {
  const url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
  return fetchData(url);
}

export async function fetchTvGenre() {
  const url = "https://api.themoviedb.org/3/genre/tv/list?language=en";
  return fetchData(url);
}
export async function fetchMovieGenre() {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  return fetchData(url);
}

export async function fetchMediaById(id, mediaType) {
  let url = "";
  if (mediaType === "movie")
    url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  else if (mediaType === "tv")
    url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;

  return fetchData(url);
}

export async function fetchCreditsById(id, mediaType) {
  let url = "";
  if (mediaType === "movie")
    url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  else if (mediaType === "tv")
    url = `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`;

  return fetchData(url);
}

export async function fetchKeywordsById(id, mediaType) {
  let url = "";
  if (mediaType === "movie")
    url = `https://api.themoviedb.org/3/movie/${id}/keywords`;
  else if (mediaType === "tv")
    url = `https://api.themoviedb.org/3/tv/${id}/keywords`;

  return fetchData(url);
}

export async function fetchRecommentdationsById(id, mediaType) {
  let url = "";
  if (mediaType === "movie")
    url = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`;
  else if (mediaType === "tv")
    url = `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`;

  return fetchData(url);
}

export async function fetchReviewsById(id, mediaType) {
  let url = "";
  if (mediaType === "movie")
    url = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
  else if (mediaType === "tv")
    url = `https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US&page=1`;

  return fetchData(url);
}

export async function getMediaRating(id, mediaType) {
  let url = "";
  if (mediaType === "movie")
    url = `https://api.themoviedb.org/3/movie/${id}/release_dates`;
  else if (mediaType === "tv")
    url = `https://api.themoviedb.org/3/tv/${id}/content_ratings`;

  return fetchData(url);
}

export async function searchMovies() {
  let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

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

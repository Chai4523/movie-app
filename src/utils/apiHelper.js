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
  const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
  return fetchData(url);
}

export async function fetchTrendingTv() {
  const url = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
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

export async function fetchMovieById(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  return fetchData(url);
}

export function getImage(imgPath, size) {
  return `${TMDB_BASE_IMG_URL}/${size}/${imgPath}`;
}

import * as dataSample from "./data";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const TMDB_BASE_URL = "";
const TMDB_BASE_IMG_URL = "https://image.tmdb.org/t/p";
const JIKAN_BASE_URL = "";

// https://image.tmdb.org/t/p/original/2n7lYEeIbucsEQCswRcVB6ZYmMP.jpg

export async function fetchData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      options
    );
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

export function getImage(imgPath, size) {
  return `${TMDB_BASE_IMG_URL}/${size}/${imgPath}`;
}

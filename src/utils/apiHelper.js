import * as dataSample from "./data"

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const TMDB_BASE_URL = "";
const TMDB_BASE_IMG_URL = "https://image.tmdb.org/t/p/";
const JIKAN_BASE_URL = "";

// https://image.tmdb.org/t/p/original/2n7lYEeIbucsEQCswRcVB6ZYmMP.jpg

// export async function fetchData() {
export function fetchData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };

  return dataSample.TRENDING_ALL_SAMPLE_RESPONSE

//   fetch("https://api.themoviedb.org/3/trending/all/day?language=en-US", options)
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//       return res;
//     })
//     .catch((err) => console.error(err));
}

export async function getImage(imgPath, size) {
    
}

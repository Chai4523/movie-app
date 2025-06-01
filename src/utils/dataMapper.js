import * as api from "../utils/apiHelper";

export const mapFromTMDB = (item, genreMap = () => {}) => ({
  id: item.id,
  title: item.title || item.name,
  overview: item.overview,
  type: item.media_type,
  genres: item.genre_ids ? genreMap(item.genre_ids) : [],
  score: item.vote_average,
  poster_path: api.getImage(item.poster_path, "w500"),
  backdrop_path: api.getImage(item.backdrop_path, "w1280"),
});

export const mapFromAniList = (item) => ({
  id: item.id,
  title: item.title.english,
  overview: item.description,
  type: item.format,
  genres: item.genres,
  score: item.averageScore,
  poster_path: item.coverImage.large,
  backdrop_path: item.bannerImage,
});

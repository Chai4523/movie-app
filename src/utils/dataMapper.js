import * as api from "../utils/apiHelper";
import { formatDate, parseHtmlText } from "./formatUtils";

export const mapHeroFromTMDB = (item, genreMap = () => {}) => ({
  id: item.id,
  title: item.title || item.name,
  overview: item.overview,
  type: item.media_type,
  genres: item.genre_ids ? genreMap(item.genre_ids) : [],
  score: item.vote_average,
  poster_path: api.getImage(item.poster_path, "w500"),
  backdrop_path: api.getImage(item.backdrop_path, "w1280"),
  source: "TMDB",
});

export const mapHeroFromAniList = (item) => ({
  id: item.id,
  title: item.title.english || item.title.userPreferred,
  overview: parseHtmlText(item.description),
  type: item.format,
  genres: item.genres.join(", "),
  score: item.averageScore / 10,
  poster_path: item.coverImage.extraLarge,
  backdrop_path: item.bannerImage,
  source: "ANI",
});

export const mapMediaCarouselFromTMDB = (item, genreMap = () => {}) => ({
  id: item.id,
  title: item.title || item.name,
  overview: item.overview,
  type: item.media_type,
  genres: item.genre_ids ? genreMap(item.genre_ids) : [],
  score: item.vote_average,
  poster_path: api.getImage(item.poster_path, "w342"),
  backdrop_path: api.getImage(item.backdrop_path, "w1280"),
  release_date:
    formatDate(new Date(item.first_air_date || item.release_date), "short") ||
    "Date N/A",
  source: "TMDB",
});

export const mapMediaCarouselFromAniList = (item) => ({
  id: item.id,
  title: item.title.english || item.title.userPreferred,
  overview: parseHtmlText(item.description),
  type: item.format,
  genres: item.genres.join(", "),
  score: item.averageScore / 10,
  poster_path: item.coverImage.extraLarge,
  backdrop_path: item.bannerImage,
  release_date:
    formatDate(
      new Date(
        item.startDate.year,
        item.startDate.month - 1,
        item.startDate.day
      ),
      "short"
    ) || "Date N/A",
  source: "ANI",
});

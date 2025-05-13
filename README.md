# 🎬 Movie App

A fully responsive movie and TV discovery app built with **React**, using **The Movie Database (TMDB) API** and **Mantine UI**. This project showcases real-world use of React Router, custom hooks, dynamic routing, debounced search, genre-based filtering, and client-side pagination.

> Live Demo: [c4523-movie-app.vercel.app](https://c4523-movie-app.vercel.app)

![screenshot](./public/screenshot_1.png) ![screenshot](./public/screenshot_2.png)

---

## 🚀 Features

- 🔎 **Search movies and TV shows** with debounced input
- 🎛 **Filter by genre**
- 🔁 **Pagination** for result navigation
- 🎥 **Media type toggle** (`movie` / `tv`)
- 🖼 Responsive **media cards** using TMDB assets
- 🌐 Dynamic routes (`/search/movie`, `/search/tv`) with URL-sync
- 🧠 Smart image fallback for missing profile pictures
- 📦 Clean folder structure with custom hooks and contexts

---

## 🛠️ Built With

- **React** (with hooks)
- **React Router v6+**
- **Mantine UI**
- **TMDB API** – for movie & TV metadata
- **Vite** – fast development setup

---

## 📁 Project Structure

```bash
src/
├── components/        # UI components (MediaCard, Carousel, etc.)
├── contexts/          # React contexts (e.g., GenreContext)
├── hooks/             # Custom hooks (e.g., useTmdbSearch)
├── pages/             # Page components (SearchPage, etc.)
├── utils/             # API helpers and config
└── App.jsx            # Main app layout and routes
```

---

## 📅 Coming Soon

These features are in development to enhance the discovery experience:

- 📺 Anime Search & Discovery powered by Jikan API
- ❤️ Save favorites

Stay tuned!

---

## 🤝 Acknowledgements

- 🎞 TMDB API – for providing high-quality movie and TV metadata
- 🎌 Jikan API – for upcoming anime support (Unofficial MyAnimeList API)
- 🧩 Mantine UI – for fast, accessible component library
- 🚀 Vercel – for easy deployment and hosting

---

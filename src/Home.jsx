import React from "react";
import * as api from "./utils/apiHelper.js";
import { useEffect } from "react";
import { useState } from "react";
import "./app.css";

export default function Home() {
  const [trending, setTrending] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const data = await api.fetchData();
        setTrending(data.results);
        console.log(trending);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchTrendingData();
  }, []);

  return (
    <div>
      <div className="carousel">Carousel</div>
      {trending &&
        trending.map((data, index) => {
          return (
            <div key={index}>
              <h3>{data.original_title}</h3>
              <p>{data.genre_ids}</p>
              <p>{data.vote_average}</p>
              <img src={api.getImage(data.backdrop_path, "w1280")} alt="" />
            </div>
          );
        })}
    </div>
  );
}

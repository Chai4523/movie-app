import React from "react";
import * as api from "./utils/apiHelper.js";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [trending, setTrending] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const data = api.fetchData();
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
      <div>Carousel</div>

    </div>
  );
}

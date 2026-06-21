// TrendingNow.jsx
import React, { useEffect, useRef, useState } from "react";
import "./TrendingNow.css";
import { useTranslation } from "react-i18next";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_KEY}`;

function TrendingNow() {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchTrending() {
      try {
        const apiKey = process.env.REACT_APP_TMDB_KEY;

        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
        );

        const data = await res.json();
        setMovies(Array.isArray(data.results) ? data.results : []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTrending();
  }, []);

  // 🔥 Scroll buttons
  const scroll = (dir) => {
    const { current } = rowRef;
    const scrollAmount = current.offsetWidth * 0.8;

    current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="trending">
      <div className="container">
       <h2>{t("home.trending.title")}</h2>

        <div className="trending__wrapper">
          <button
            className="trending__btn left"
            onClick={() => scroll("left")}
          >
            ‹
          </button>

          <div className="trending__row" ref={rowRef}>
            {movies.slice(0, 10).map((item, index) => {
              const img = item.poster_path
                ? `${IMAGE_BASE}${item.poster_path}`
                : "/fallback.jpg";

              return (
                <div className="trending__card" key={item.id}>
                  {/* 🔥 BIG NUMBER */}
                  <span className="trending__number">
                    {index + 1}
                  </span>

                  <img
                    src={img}
                    alt={item.title}
                    className="trending__image"
                  />
                </div>
              );
            })}
          </div>

          <button
            className="trending__btn right"
            onClick={() => scroll("right")}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export default TrendingNow;
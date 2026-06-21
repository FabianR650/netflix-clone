import React, { useEffect, useState } from "react";
import tmdb from "../utils/tmdb";
import requests from "../utils/requests";
import "./Banner.css";

const baseImageUrl = "https://image.tmdb.org/t/p/original";

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await tmdb.get(requests.fetchNetflixOriginals);
      const results = res.data.results || [];
      setMovie(results[Math.floor(Math.random() * results.length)]);
    }
    fetchData();
  }, []);

  const truncate = (str, n) =>
    str?.length > n ? str.substring(0, n - 1) + "…" : str;

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: movie?.backdrop_path
          ? `url(${baseImageUrl}${movie.backdrop_path})`
          : "none",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button banner__button--secondary">
            My List
          </button>
        </div>
        <p className="banner__description">
          {truncate(movie?.overview, 150)}
        </p>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}

export default Banner;
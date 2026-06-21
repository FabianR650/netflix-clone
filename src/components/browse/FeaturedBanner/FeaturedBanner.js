import React, { useEffect, useState } from "react";
import "./FeaturedBanner.css";
import tmdb from "../../../utils/tmdb";
import requests from "../../../utils/requests";

function FeaturedBanner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    tmdb
      .get(requests.fetchNetflixOriginals)
      .then(function (response) {
        var results = response.data.results;
        var randomIndex = Math.floor(Math.random() * results.length);
        setMovie(results[randomIndex]);
      })
      .catch(function (error) {
        console.error("Failed to load featured movie", error);
      });
  }, []);

  var title = "";
  var description = "";
  var backgroundImage = "none";

  if (movie) {
    title = movie.title || movie.name || movie.original_name;
    description = movie.overview ? movie.overview.slice(0, 150) + "..." : "";
    backgroundImage = movie.backdrop_path
      ? "url(https://image.tmdb.org/t/p/original" + movie.backdrop_path + ")"
      : "none";
  }

  return (
    <header className="featuredBanner" style={{ backgroundImage: backgroundImage }}>
      <div className="featuredBanner__content">
        <h1 className="featuredBanner__title">{title}</h1>

        <p className="featuredBanner__description">{description}</p>

        <div className="featuredBanner__buttons">
          <button className="featuredBanner__button">Play</button>
          <button className="featuredBanner__button featuredBanner__button--secondary">
            More Info
          </button>
        </div>
      </div>

      <div className="featuredBanner__fadeBottom" />
    </header>
  );
}

export default FeaturedBanner;
import React, { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import "./Row.css";

const baseImageUrl = "https://image.tmdb.org/t/p/w500";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await tmdb.get(fetchUrl);
      setMovies(res.data.results || []);
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          const imgPath = isLargeRow
            ? movie.poster_path
            : movie.backdrop_path || movie.poster_path;

          if (!imgPath) return null;

          return (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
              src={`${baseImageUrl}${imgPath}`}
              alt={movie.name || movie.title}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Row;
import React, { useEffect, useState } from "react";
import "./MovieRow.css";
import tmdb from "../../../utils/tmdb";
import MovieModal from "../MovieModal/MovieModal";

const baseImg = "https://image.tmdb.org/t/p/w500";

function MovieRow(props) {
  const { title, fetchUrl } = props;
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // simple fetch without advanced patterns
    tmdb
      .get(fetchUrl)
      .then((res) => setMovies(res.data.results || []))
      .catch(() => setMovies([]));
  }, [fetchUrl]);

  function openModal(movie) {
    setSelectedMovie(movie);
  }

  function closeModal() {
    setSelectedMovie(null);
  }

  return (
    <div className="movieRow">
      <h2 className="movieRow__title">{title}</h2>

      <div className="movieRow__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="movieRow__poster"
            src={movie.poster_path ? `${baseImg}${movie.poster_path}` : ""}
            alt={movie.title || movie.name || "movie"}
            onClick={() => openModal(movie)}
          />
        ))}

        {selectedMovie ? (
          <MovieModal movie={selectedMovie} onClose={closeModal} />
        ) : null}
      </div>
    </div>
  );
}

export default MovieRow;
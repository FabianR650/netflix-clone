import React, { useState } from "react";
import "./Search.css";
import tmdb from "../../utils/tmdb";
import BrowseNavbar from "../../components/browse/BrowseNavbar/BrowseNavbar";
import MovieModal from "../../components/browse/MovieModal/MovieModal";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  async function searchMovies() {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await tmdb.get(`/search/movie`, {
        params: { query },
      });
      setResults(res.data.results || []);
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    }
  }

  return (
    <div className="searchPage">
      <BrowseNavbar />

      <div className="searchPage__header">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="searchPage__input"
        />
      </div>

      <div className="searchPage__results">
        {results.length === 0 && query.length > 0 && (
          <p className="searchPage__empty">No results found</p>
        )}

        {results.map((movie) => (
          <img
            key={movie.id}
            className="searchPage__poster"
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default Search;
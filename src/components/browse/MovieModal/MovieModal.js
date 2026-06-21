import React, { useEffect, useState } from "react";
import "./MovieModal.css";
import tmdb from "../../../utils/tmdb";
import { db, auth } from "../../../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

const baseImg = "https://image.tmdb.org/t/p/original";

function MovieModal({ movie, onClose }) {
  const [movieData, setMovieData] = useState({
    details: null,
    trailerKey: null,
    recommendations: [],
  });
  const [inList, setInList] = useState(false);
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchEndY, setTouchEndY] = useState(null);

  const user = auth.currentUser;

  // -----------------------------
  // FETCH MOVIE INFO
  // -----------------------------
  useEffect(() => {
    async function fetchMovieInfo() {
      try {
        const [detailsRes, videosRes, recsRes] = await Promise.all([
          tmdb.get(`/movie/${movie.id}`),
          tmdb.get(`/movie/${movie.id}/videos`),
          tmdb.get(`/movie/${movie.id}/recommendations`),
        ]);

        const videos = videosRes.data.results || [];
        const trailer =
          videos.find(
            (v) =>
              v.type === "Trailer" &&
              v.site === "YouTube" &&
              v.official === true
          ) ||
          videos.find((v) => v.type === "Trailer" && v.site === "YouTube");

        const recommendations = recsRes.data.results
          ? recsRes.data.results.slice(0, 12)
          : [];

        setMovieData({
          details: detailsRes.data,
          trailerKey: trailer ? trailer.key : null,
          recommendations,
        });
      } catch (err) {
        console.error("Movie fetch failed:", err);
      }
    }

    if (movie?.id) fetchMovieInfo();
  }, [movie]);

  // -----------------------------
  // CHECK IF IN MY LIST
  // -----------------------------
  useEffect(() => {
    if (!user || !movie?.id) return;

    const ref = doc(db, "users", user.uid, "myList", movie.id.toString());
    getDoc(ref)
      .then((snap) => setInList(snap.exists()))
      .catch((err) => console.error("My list check failed:", err));
  }, [movie, user]);

  // -----------------------------
  // ADD / REMOVE FROM MY LIST
  // -----------------------------
  async function addToList() {
    if (!user) return alert("Please sign in to save movies");

    const ref = doc(db, "users", user.uid, "myList", movie.id.toString());
    await setDoc(ref, {
      id: movie.id,
      title: movie.title || movie.name,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      overview: movie.overview,
      timestamp: Date.now(),
    });
    setInList(true);
  }

  async function removeFromList() {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "myList", movie.id.toString());
    await deleteDoc(ref);
    setInList(false);
  }

  // -----------------------------
  // MOBILE SWIPE DOWN TO CLOSE
  // -----------------------------
  function handleTouchStart(e) {
    setTouchStartY(e.touches[0].clientY);
  }

  function handleTouchMove(e) {
    setTouchEndY(e.touches[0].clientY);
  }

  function handleTouchEnd() {
    if (!touchStartY || !touchEndY) return;
    const distance = touchEndY - touchStartY;
    if (distance > 80) onClose();
    setTouchStartY(null);
    setTouchEndY(null);
  }

  // -----------------------------
  // ESC KEY CLOSE
  // -----------------------------
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // -----------------------------
  // FORMATTERS
  // -----------------------------
  const { details, trailerKey, recommendations } = movieData;

  const getYear = () => details?.release_date?.slice(0, 4) || "";
  const getGenres = () =>
    details?.genres?.map((g) => g.name).join(", ") || "";
  const getRuntime = () => {
    if (!details?.runtime) return "";
    const hours = Math.floor(details.runtime / 60);
    const minutes = details.runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="modal__overlay">
      <div
        className="modal__content"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* TRAILER OR BACKDROP */}
        <div className="modal__banner">
          {trailerKey ? (
            <iframe
              className="modal__video"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=1&loop=1&playlist=${trailerKey}`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <div
              className="modal__imageFallback"
              style={{
                backgroundImage: `url(${baseImg}${movie.backdrop_path})`,
              }}
            />
          )}
        </div>

        {/* CLOSE BUTTON */}
        <button className="modal__close" onClick={onClose}>
          ✕
        </button>

        {/* BODY */}
        <div className="modal__body">
          <h1 className="modal__title">{movie.title || movie.name}</h1>
          <p className="modal__overview">{movie.overview}</p>

          {/* MY LIST BUTTON */}
          <button
            className="modal__button modal__button--list"
            onClick={inList ? removeFromList : addToList}
          >
            {inList ? "✓ In My List" : "+ My List"}
          </button>

          {/* DETAILS */}
          {details && (
            <div className="modal__details">
              <p><strong>Genres:</strong> {getGenres()}</p>
              <p><strong>Release:</strong> {getYear()}</p>
              <p><strong>Runtime:</strong> {getRuntime()}</p>
              <p>
                <strong>Rating:</strong>{" "}
                {details.vote_average ? details.vote_average.toFixed(1) : ""}
              </p>
              {details.tagline && (
                <p className="modal__tagline">“{details.tagline}”</p>
              )}
            </div>
          )}

          {/* MORE LIKE THIS */}
          {recommendations.length > 0 && (
            <div className="modal__moreLikeThis">
              <h2>More Like This</h2>
              <div className="modal__recommendations">
                {recommendations.map((rec) => (
                  <img
                    key={rec.id}
                    className="modal__recommendationPoster"
                    src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`}
                    alt={rec.title}
                    onClick={() => onClose(rec)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieModal;

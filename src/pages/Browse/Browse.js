import React from "react";
import "./Browse.css";

import BrowseNavbar from "../../components/browse/BrowseNavbar/BrowseNavbar";
import FeaturedBanner from "../../components/browse/FeaturedBanner/FeaturedBanner";
import MovieRow from "../../components/browse/MovieRow/MovieRow";

import requests from "../../utils/requests";
import { useProfile } from "../../context/ProfileContext";
import { Navigate } from "react-router-dom";

function Browse() {
  // use simple context access
  const profileContext = useProfile();
  const activeProfile = profileContext && profileContext.activeProfile;

  // if no profile selected, redirect to profiles page
  if (!activeProfile) {
    return <Navigate to="/profiles" />;
  }

  return (
    <div className="browse">
      <BrowseNavbar />
      <FeaturedBanner />

      <div className="browse__rows">
        <MovieRow title="Trending Now" fetchUrl={requests.fetchTrending} />
        <MovieRow title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <MovieRow title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <MovieRow title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <MovieRow title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <MovieRow title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <MovieRow title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        <MovieRow title="My List" myList={true} />
      </div>
    </div>
  );
}

export default Browse;
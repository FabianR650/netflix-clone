import React from "react";
import "./BrowseNavbar.css";

function BrowseNavbar({ activeProfile }) {
  const avatarSrc = activeProfile && activeProfile.avatar ? activeProfile.avatar : "";
  return (
    <div className="browseNav">
      <div className="browseNav__left">
        <h1 className="browseNav__logo">NETFLIX</h1>

        <ul className="browseNav__links">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
        </ul>
      </div>

      <div className="browseNav__right">
        <span className="browseNav__profile">🙂</span>
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt="Profile Avatar"
            className="browseNav__avatar"
          />
        ) : null}
      </div>
    </div>
  );
}

export default BrowseNavbar;
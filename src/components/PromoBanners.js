// PromoBanner.jsx
import React from "react";
import "./PromoBanner.css";
import { PopcornIcon } from "./PopcornIcon";

export default function PromoBanners() {
  return (
    <>
    <div className="promo-wrapper">
  {/* RED ARCH */}
  <div className="promo-arch" />

  {/* BANNER */}
  <div className="promo-container">
    <PopcornIcon className="promo-icon" />
    <div className="promo-banner">
      <div className="promo-left">
        <div className="promo-text">
          <h4>The Netflix you love for just $8.99.</h4>
          <p>Get our most affordable, ad-supported plan.</p>
        </div>
      </div>

      <button className="promo-btn">Learn More</button>
    </div>
  </div>
</div>
</>
  );
}


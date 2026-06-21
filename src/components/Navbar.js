"use client";

import React, { useState } from "react";
import "./Navbar.css";

const translations = {
  en: {
    navbar: {
      english: "English",
      spanish: "Spanish",
      signIn: "Sign In",
    },
  },
  es: {
    navbar: {
      english: "Inglés",
      spanish: "Español",
      signIn: "Iniciar sesión",
    },
  },
};

function Navbar() {
  const [language, setLanguage] = useState("en");
  const text = translations[language];

  return (
    <header className="nav">
      <div className="nav__container">

        {/* LEFT — LOGO */}
        <div className="nav__left">
          <div className="nav__logo">
            <span className="nav__wordmarkText">NETFLIX</span>
          </div>
        </div>

        {/* RIGHT — LANGUAGE + SIGN IN */}
        <div className="nav__right">

          {/* LANGUAGE DROPDOWN */}
          <div className="nav__language">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">{text.navbar.english}</option>
              <option value="es">{text.navbar.spanish}</option>
            </select>
          </div>

          {/* SIGN IN BUTTON */}
          <a className="nav__signin">{text.navbar.signIn}</a>
        </div>

      </div>
    </header>
  );
}

export default Navbar;

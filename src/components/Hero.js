"use client";

import React, { useState } from "react";
import "./Hero.css";
import netflix from "../assets/netflix-bg.jpg";

const translations = {
  en: {
    title: "Unlimited movies, TV shows, and more.",
    subtitle: "Watch anywhere. Cancel anytime.",
    cta: "Get Started",
    description: "Ready to watch? Enter your email to create or restart your membership.",
    placeholder: "Email address",
  },
  es: {
    title: "Películas y series ilimitadas.",
    subtitle: "Mira donde quieras. Cancela cuando quieras.",
    cta: "Comenzar",
    description: "¿Listo para mirar? Ingresa tu correo para crear o reanudar tu membresía.",
    placeholder: "Correo electrónico",
  },
};

function Hero({ language = "en" }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const content = translations[language] || translations.en;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    setError("");
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${netflix})` }}
    >
      <div className="hero__layer" />

      <div className="hero__card">
        <h1 className="hero__title">{content.title}</h1>
        <p className="hero__subtitle">{content.subtitle}</p>
        <p className="hero__text">{content.description}</p>

        <form className="hero__form" onSubmit={handleSubmit}>
          <input
            className="hero__input"
            type="email"
            value={email}
            placeholder={content.placeholder}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="hero__button" type="submit">
            {content.cta}
          </button>
        </form>

        {error && <div className="hero__error">{error}</div>}
      </div>
    </section>
  );
}

export default Hero;

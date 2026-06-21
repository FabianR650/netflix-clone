"use client";

import { useLanguage } from "../context/LanguageContext";
import "./Footer.css";

export default function Footer() {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="footer-container">
      <p className="footer-question">
        {language === "en"
          ? "Questions? Call "
          : "¿Preguntas? Llama al "}
        <a href="tel:1-866-952-4456">1-866-952-4456</a>
      </p>

      {/* ...links... */}
       <ul className="footer-links">
        <li><a href="https://help.netflix.com/support/412">FAQ</a></li>
        <li><a href="https://help.netflix.com">Help Center</a></li>
        <li><a href="/youraccount">Account</a></li>
        <li><a href="https://www.netflixhouse.com/">Netflix House</a></li>
        <li><a href="https://media.netflix.com/">Media Center</a></li>
        <li><a href="http://ir.netflix.com/">Investor Relations</a></li>
        <li><a href="https://jobs.netflix.com/jobs">Jobs</a></li>
        <li><a href="https://netflix.shop/">Netflix Shop</a></li>
        <li><a href="/redeem">Redeem Gift Cards</a></li>
        <li><a href="/gift-cards">Buy Gift Cards</a></li>
        <li><a href="/watch">Ways to Watch</a></li>
        <li><a href="https://help.netflix.com/legal/termsofuse">Terms of Use</a></li>
        <li><a href="https://help.netflix.com/legal/privacy">Privacy</a></li>
        <li><a href="#">Cookie Preferences</a></li>
        <li><a href="https://help.netflix.com/legal/corpinfo">Corporate Information</a></li>
        <li><a href="https://help.netflix.com/contactus">Contact Us</a></li>
        <li><a href="https://fast.com">Speed Test</a></li>
        <li><a href="https://help.netflix.com/legal/notices">Legal Notices</a></li>
        <li><a href="https://www.netflix.com/browse/genre/839338">Only on Netflix</a></li>
        <li><a href="https://www.netflix.com/dnsspi">Do Not Sell or Share My Personal Information</a></li>
        <li><a href="https://netflix.com/adchoices-us">Ad Choices</a></li>
      </ul>

      <div className="footer-language">
        <label htmlFor="languageSelect">
          {language === "en" ? "Select Language" : "Seleccionar idioma"}
        </label>

        <select
          id="languageSelect"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>

      <p className="footer-recaptcha">
        {language === "en"
          ? "This page is protected by Google reCAPTCHA to ensure you're not a bot."
          : "Esta página está protegida por Google reCAPTCHA para garantizar que no eres un robot."}
      </p>
    </footer>
  );
}

import Hero from "../components/Hero";
import MoreReasons from "../components/MoreReasons";
import Navbar from "../components/Navbar";
import PromoBanners from "../components/PromoBanners";
import TrendingNow from "../components/TrendingNow";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import { LanguageProvider } from "../context/LanguageContext";

export default function HomePage() {
  return (
    <LanguageProvider>
      <Navbar />
      <Hero />
      <PromoBanners />
      <TrendingNow />
      <MoreReasons />
      <FaqSection />
      <Footer />
    </LanguageProvider>
  );
}

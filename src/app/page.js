import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import WhyTedx from "./components/WhyTedx";
import Blog from "./components/Blog";
import Gallery from "./components/Gallery";
import Speakers from "./components/Speakers";
import Tickets from "./components/Tickets";
import FAQ from "./components/Faqs";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <About />
      <WhyTedx />
      <Blog />
      <Gallery />
      <Speakers />
      <Tickets />
      <FAQ />
      <Footer />
    </div>
  );
}

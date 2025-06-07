import HeroSection from "@/components/home/HeroSection";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import AboutSection from "@/components/about/AboutSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import ContactSection from "@/components/contact/ContactSection";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>La Bottega di Moondy | Portfolio Artistico</title>
        <meta name="description" content="Scopri il portfolio artistico di Moondy, talentuosa artista e disegnatrice. Esplora le sue opere, dai dipinti alle illustrazioni digitali, caratterizzate da uno stile unico ed elegante." />
      </Helmet>
      <HeroSection />
      <FeaturedWorks />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}

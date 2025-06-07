import AboutSection from "@/components/about/AboutSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <title>Chi Sono | La Bottega di Moondy</title>
        <meta name="description" content="Scopri di più su Moondy, artista e disegnatrice. Biografia, formazione, ispirazioni e percorso artistico di una talentuosa artista contemporanea." />
      </Helmet>
      <div className="py-10 bg-gradient-to-br from-purple-light/20 to-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="font-playfair italic text-4xl md:text-5xl font-bold text-purple-dark mb-4">
            Chi Sono
          </h1>
          <p className="text-purple-darker max-w-2xl mx-auto">
            Scopri la mia storia, le mie ispirazioni e il mio percorso artistico.
          </p>
        </div>
      </div>
      <AboutSection />
      <TestimonialsSection />
    </>
  );
}

import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { Helmet } from "react-helmet";

export default function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Portfolio | La Bottega di Moondy</title>
        <meta name="description" content="Esplora la collezione completa delle opere di Moondy, organizzate per categorie e stili artistici. Dipinti, illustrazioni e arte digitale in un unico portfolio." />
      </Helmet>
      <div className="py-10 bg-gradient-to-br from-purple-light/20 to-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="font-playfair italic text-4xl md:text-5xl font-bold text-purple-dark mb-4">
            Il Mio Portfolio
          </h1>
          <p className="text-purple-darker max-w-2xl mx-auto">
            Esplora tutte le mie opere d'arte, dalle più recenti alle più significative del mio percorso artistico.
          </p>
        </div>
      </div>
      <PortfolioGrid />
    </>
  );
}

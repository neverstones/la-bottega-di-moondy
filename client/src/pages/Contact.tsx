import ContactSection from "@/components/contact/ContactSection";
import { Helmet } from "react-helmet";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contatti | La Bottega di Moondy</title>
        <meta name="description" content="Contatta Moondy per informazioni, commissioni artistiche o collaborazioni. Compila il modulo o utilizza i contatti diretti per entrare in comunicazione." />
      </Helmet>
      <div className="py-10 bg-gradient-to-br from-purple-light/20 to-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="font-playfair italic text-4xl md:text-5xl font-bold text-purple-dark mb-4">
            Contattami
          </h1>
          <p className="text-purple-darker max-w-2xl mx-auto">
            Hai domande o vuoi commissionare un'opera? Sono qui per aiutarti.
          </p>
        </div>
      </div>
      <ContactSection />
    </>
  );
}


import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { artworks } from "@/lib/artwork";

const FeaturedWorks = () => {
  const featuredWorks = artworks.filter(artwork => artwork.featured);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8" ref={ref}>
        <div className="text-center mb-12">
          <motion.h2 
            className="font-playfair italic text-3xl md:text-4xl font-bold text-purple-dark mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            Opere in Evidenza
          </motion.h2>
          <motion.p 
            className="text-purple-darker max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Una selezione delle mie creazioni più recenti e significative che rappresentano il mio stile artistico e la mia visione creativa.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featuredWorks.map((artwork) => (
            <motion.div 
              key={artwork.id} 
              className="gallery-image rounded-lg overflow-hidden shadow-lg bg-white"
              variants={itemVariants}
            >
              <img 
                src={artwork.image} 
                alt={artwork.title} 
                className="w-full h-80 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-playfair italic text-xl text-purple-dark">{artwork.title}</h3>
                <p className="text-sm text-gray-600">{artwork.medium}, {artwork.year}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link href="/portfolio">
            <span className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-md hover:bg-purple-dark transition duration-300 shadow-lg shadow-primary/20">
              <span>Vedi tutte le opere</span>
              <ArrowRight size={18} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWorks;

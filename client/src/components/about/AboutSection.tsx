import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { FileText, User, Mail } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const skills = [
    "Illustrazione Digitale",
    "Character Design",
    "Fantasy & Sci-Fi",
    "Arte Fantasy",
    "Animazione",
    "Fan Art"
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8" ref={ref}>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div 
            className="md:w-2/5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <img 
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80" 
              alt="Spazio creativo di Moondy" 
              className="rounded-lg shadow-xl w-full h-auto border-8 border-white"
            />
          </motion.div>
          
          <motion.div 
            className="md:w-3/5"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2 
              className="font-playfair italic text-3xl md:text-4xl font-bold text-purple-dark mb-6"
              variants={itemVariants}
            >
              Chi Sono
            </motion.h2>
            
            <motion.p 
              className="text-purple-darker mb-4 leading-relaxed"
              variants={itemVariants}
            >
              Benvenuti nel mio mondo creativo! Sono Moondy, un'artista e illustratrice con una passione per la creazione di opere che fondono elementi tradizionali e tecniche digitali moderne.
            </motion.p>
            
            <motion.p 
              className="text-purple-darker mb-4 leading-relaxed"
              variants={itemVariants}
            >
              La mia ricerca artistica è incentrata sull'uso del colore e delle forme come strumenti di comunicazione emotiva. Nelle mie opere, le tonalità di viola rappresentano il mistero e la magia, creando connessioni profonde con chi le osserva.
            </motion.p>
            
            <motion.p 
              className="text-purple-darker mb-6 leading-relaxed"
              variants={itemVariants}
            >
              Il mio percorso artistico è in continua evoluzione, alimentato dalla curiosità e dalla volontà di sperimentare nuovi stili e tecniche. Oggi, divido il mio tempo tra commissioni private, progetti personali e collaborazioni creative che mi permettono di esprimere la mia visione artistica.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <h3 className="font-playfair italic text-xl text-purple-dark mb-4">Le mie ispirazioni</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-purple-light/30 text-purple-dark rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="flex gap-4 mt-8"
              variants={itemVariants}
            >
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-purple-dark transition duration-300 shadow-lg shadow-primary/20">
                  <Mail size={18} />
                  <span>Contattami</span>
                </span>
              </Link>
              <a 
                href="#" 
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-white transition duration-300"
              >
                <FileText size={18} />
                <span>Scarica CV</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";

const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  const variants = {
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
  
  const imageVariants = {
    hidden: { opacity: 0, y: 20, rotate: -2 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: -2,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  return (
    <section id="home" className="py-20 md:py-28 bg-gradient-to-br from-purple-light/20 to-white">
      <div className="container mx-auto px-4 md:px-8" ref={ref}>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h1 
              className="font-playfair italic text-4xl md:text-6xl font-bold text-purple-dark mb-6"
              initial="hidden"
              animate={controls}
              variants={variants}
            >
              La Bottega di <span className="text-primary">Moondy</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg mb-8 text-purple-darker max-w-lg"
              initial="hidden"
              animate={controls}
              variants={{
                ...variants,
                visible: {
                  ...variants.visible,
                  transition: { ...variants.visible.transition, delay: 0.1 }
                }
              }}
            >
              Benvenuti nel mio mondo creativo. Esplora il mio portfolio e scopri come trasformo emozioni e idee in opere d'arte uniche attraverso disegni, illustrazioni e progetti creativi.
            </motion.p>
            
            <motion.div 
              className="flex space-x-4"
              initial="hidden"
              animate={controls}
              variants={{
                ...variants,
                visible: {
                  ...variants.visible,
                  transition: { ...variants.visible.transition, delay: 0.2 }
                }
              }}
            >
              <Link href="/portfolio">
                <span className="px-8 py-3 bg-primary text-white rounded-md hover:bg-purple-dark transition duration-300 shadow-lg shadow-primary/20">
                  Esplora le opere
                </span>
              </Link>
              <Link href="/contact">
                <span className="px-8 py-3 border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-white transition duration-300">
                  Contattami
                </span>
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="md:w-1/2"
            initial="hidden"
            animate={controls}
            variants={imageVariants}
          >
            <img 
              src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80" 
              alt="Opera artistica di Moondy" 
              className="rounded-lg shadow-xl w-full h-auto object-cover transform -rotate-2 border-8 border-white"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

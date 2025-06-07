
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/artwork";

const TestimonialsSection = () => {
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
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
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
            Cosa Dicono di Me
          </motion.h2>
          <motion.p 
            className="text-purple-darker max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Le opinioni di clienti e collaboratori che hanno apprezzato il mio lavoro artistico.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-lg relative"
              variants={itemVariants}
            >
              <div className="absolute -top-4 -right-4 bg-primary text-white p-3 rounded-full shadow-md">
                <Quote size={20} />
              </div>

              <div className="flex items-center mb-4">
                <div className="text-gold text-xl flex">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} fill="#F0CE6C" className="h-5 w-5" />
                  ))}
                </div>
              </div>

              <p className="text-purple-darker italic mb-6">
                "{testimonial.text}"
              </p>

              <div className="flex items-center">
                <div>
                  <h4 className="font-playfair font-semibold text-purple-dark">{testimonial.name}</h4>
                  <p className="text-purple-dark/70 text-sm">{testimonial.role || ''}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

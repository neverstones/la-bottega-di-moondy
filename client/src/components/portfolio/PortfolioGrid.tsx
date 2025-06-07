import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { artworks, categories } from "@/lib/artwork";

const PortfolioGrid = () => {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleFilterChange = (categoryId: number | null) => {
    setActiveFilter(categoryId);
  };

  // Filter artworks based on category and search query
  const filteredArtworks = artworks.filter(artwork => {
    const matchesCategory = activeFilter === null || artwork.categoryId === activeFilter;
    const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (artwork.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
                          (artwork.medium?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="portfolio" className="py-16 bg-neutral-light">
      <div className="container mx-auto px-4 md:px-8" ref={ref}>
        <div className="text-center mb-12">
          <motion.h2 
            className="font-playfair italic text-3xl md:text-4xl font-bold text-purple-dark mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            Il Mio Portfolio
          </motion.h2>
          <motion.p 
            className="text-purple-darker max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Esplora la mia collezione completa di opere, organizzate per categorie e stili artistici.
          </motion.p>
        </div>
        
        {/* Search and Filter Options */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cerca opere..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-md border border-purple-light/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          {/* Portfolio Filter */}
          <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeFilter === null 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-purple-dark hover:bg-primary hover:text-white'
              }`}
              onClick={() => handleFilterChange(null)}
            >
              Tutti
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeFilter === category.id 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-purple-dark hover:bg-primary hover:text-white'
                }`}
                onClick={() => handleFilterChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Portfolio Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            key={activeFilter ? `cat-${activeFilter}` : 'all'} // Re-mount when filter changes
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {filteredArtworks.length > 0 ? (
              filteredArtworks.map((artwork) => (
                <motion.div 
                  key={artwork.id} 
                  className="gallery-image rounded-lg overflow-hidden shadow-lg bg-white"
                  variants={itemVariants}
                  layout
                >
                  <img 
                    src={artwork.image} 
                    alt={artwork.title} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 bg-white">
                    <h3 className="font-playfair italic text-xl text-purple-dark">{artwork.title}</h3>
                    <p className="text-sm text-gray-600">{artwork.medium}, {artwork.year}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-full text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Filter className="h-12 w-12 text-gray-400" />
                  <p className="text-purple-dark text-lg">Nessuna opera trovata con i filtri selezionati.</p>
                  <button
                    onClick={() => {
                      setActiveFilter(null);
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-dark transition-colors"
                  >
                    Reimposta filtri
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioGrid;

import { useState, useEffect } from "react";
import { Link } from "wouter";

const basePath = import.meta.env.BASE_URL || "/";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPath }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Chi Sono", path: "/about" },
    { label: "Contatti", path: "/contact" },
  ];

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-white shadow-md py-3" : "bg-white/90 py-4"
    )}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="/">
          <span className="font-playfair italic text-2xl md:text-3xl font-bold text-primary">La Bottega di Moondy</span>
        </Link>
        
        {/* Mobile menu button */}
        <div className="block md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-purple-dark focus:outline-none"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path}>
                <span className={cn(
                  "menu-item",
                  currentPath === item.path && "active text-primary"
                )}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={cn(
          "md:hidden bg-white w-full overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "max-h-60" : "max-h-0"
        )}
      >
        <ul className="px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path}>
                <span
                  className={cn(
                    "block py-2 px-2 text-purple-dark hover:text-primary transition-colors",
                    currentPath === item.path && "text-primary font-medium"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

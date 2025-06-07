import { Link } from "wouter";
import { 
  Instagram, 
  Facebook, 
  Youtube,
  Gift,
  Heart,
  Linkedin, 
  Video,
  ExternalLink
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-purple-darker text-white py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <span className="font-playfair italic text-2xl font-bold text-white">La Bottega di Moondy</span>
            </Link>
            <p className="text-purple-light/80 mt-2">Trasformare emozioni in arte</p>
          </div>
          
          <div className="flex space-x-8 md:space-x-12">
            <Link href="/">
              <span className="text-purple-light hover:text-white transition duration-300">Home</span>
            </Link>
            <Link href="/portfolio">
              <span className="text-purple-light hover:text-white transition duration-300">Portfolio</span>
            </Link>
            <Link href="/about">
              <span className="text-purple-light hover:text-white transition duration-300">Chi Sono</span>
            </Link>
            <Link href="/contact">
              <span className="text-purple-light hover:text-white transition duration-300">Contatti</span>
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-purple-light/20">
          <p className="text-purple-light/70 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} La Bottega di Moondy. Tutti i diritti riservati.</p>
          
          <div className="flex space-x-6">
            <Link href="#">
              <span className="text-purple-light/70 hover:text-white transition duration-300 text-sm">Privacy Policy</span>
            </Link>
            <Link href="#">
              <span className="text-purple-light/70 hover:text-white transition duration-300 text-sm">Termini di Servizio</span>
            </Link>
            <Link href="#">
              <span className="text-purple-light/70 hover:text-white transition duration-300 text-sm">Cookie Policy</span>
            </Link>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <a href="https://www.instagram.com/moondyviolin/?igshid=MzRlODBiNWFlZA%3D%3D" target="_blank" rel="noopener noreferrer" className="social-icon text-purple-light/80 hover:text-white flex flex-col items-center">
            <Instagram className="h-6 w-6 mb-1" />
            <span className="text-xs">Instagram</span>
          </a>
          <a href="https://www.facebook.com/people/Moondy/61558375220396/?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="social-icon text-purple-light/80 hover:text-white flex flex-col items-center">
            <Facebook className="h-6 w-6 mb-1" />
            <span className="text-xs">Facebook</span>
          </a>
          <a href="https://www.youtube.com/@moondyviolin" target="_blank" rel="noopener noreferrer" className="social-icon text-purple-light/80 hover:text-white flex flex-col items-center">
            <Youtube className="h-6 w-6 mb-1" />
            <span className="text-xs">YouTube</span>
          </a>
          <a href="https://www.tiktok.com/login?redirect_url=https%3A%2F%2Fwww.tiktok.com%2F%40moondyviolin%3F_t%3D8g36MIDxeYC%26_r%3D1&lang=en&enter_method=mandatory" target="_blank" rel="noopener noreferrer" className="social-icon text-purple-light/80 hover:text-white flex flex-col items-center">
            <Video className="h-6 w-6 mb-1" />
            <span className="text-xs">TikTok</span>
          </a>
          <a href="https://cara.app/moondyviolin" target="_blank" rel="noopener noreferrer" className="social-icon text-purple-light/80 hover:text-white flex flex-col items-center">
            <Heart className="h-6 w-6 mb-1" />
            <span className="text-xs">Cara</span>
          </a>
          <a href="https://www.deviantart.com/moondyviolin" target="_blank" rel="noopener noreferrer" className="social-icon text-purple-light/80 hover:text-white flex flex-col items-center">
            <ExternalLink className="h-6 w-6 mb-1" />
            <span className="text-xs">DeviantArt</span>
          </a>
          <a href="https://www.ferriswheelpress.uk/?platform=grin&link_id=1715203&token=zLZLrWAFSFlH9zAoC0U7Lern7nkLjw5k&contact_id=a2472b02-586b-4772-8051-f3034a294740&attribution_window=30" target="_blank" rel="noopener noreferrer" className="social-icon text-purple-light/80 hover:text-white flex flex-col items-center">
            <Gift className="h-6 w-6 mb-1" />
            <span className="text-xs">Ferris Wheel Press</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

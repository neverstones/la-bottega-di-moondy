import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

document.title = "La Bottega di Moondy | Portfolio Artistico";

const meta = document.createElement('meta');
meta.name = 'description';
meta.content = 'Scopri il portfolio artistico di Moondy, talentuosa artista e disegnatrice. Esplora le sue opere, dai dipinti alle illustrazioni digitali, caratterizzate da uno stile unico ed elegante.';
document.head.appendChild(meta);

const ogTitle = document.createElement('meta');
ogTitle.setAttribute('property', 'og:title');
ogTitle.content = 'La Bottega di Moondy | Portfolio Artistico';
document.head.appendChild(ogTitle);

const ogDescription = document.createElement('meta');
ogDescription.setAttribute('property', 'og:description');
ogDescription.content = 'Esplora il portfolio di Moondy, con opere artistiche uniche ed eleganti in tonalità viola. Contattami per commissioni e collaborazioni.';
document.head.appendChild(ogDescription);

createRoot(document.getElementById("root")!).render(<App />);

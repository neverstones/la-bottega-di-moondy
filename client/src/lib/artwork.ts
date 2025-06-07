export type ArtworkCategory = 'calligrafia' | 'illustrazioni' | 'digitale';

export interface Artwork {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  image: string;
  year: number;
  medium: string | null;
  categoryId: number | null;
  featured: boolean;
  dimensions?: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string | null;
  text: string;
  stars: number;
  approved: boolean;
}

// Categorie di opere
export const categories: Category[] = [
  {
    id: 1,
    name: "Calligrafia",
    slug: "calligrafia",
    description: "Opere di calligrafia artistica"
  },
  {
    id: 2,
    name: "Illustrazioni",
    slug: "illustrazioni",
    description: "Illustrazioni artistiche"
  },
  {
    id: 3,
    name: "Progetti Digitali",
    slug: "digitale",
    description: "Progetti di arte digitale"
  }
];

// Dati delle opere d'arte (con immagini più appropriate per i lavori di Moondy)
export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Fantasia Viola",
    slug: "fantasia-viola",
    description: "Un'opera che esplora l'armonia delle tonalità viola e oro con elementi calligrafici.",
    image: "https://images.pexels.com/photos/691710/pexels-photo-691710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    year: 2023,
    medium: "Inchiostro e acquerello",
    categoryId: 1,
    featured: true
  },
  {
    id: 2,
    title: "Calligrafia Elegante",
    slug: "calligrafia-elegante",
    description: "Una delicata composizione di calligrafia artistica con decorazioni floreali.",
    image: "https://images.pexels.com/photos/261526/pexels-photo-261526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    year: 2023,
    medium: "Penna stilografica e acquerello",
    categoryId: 1,
    featured: true
  },
  {
    id: 3,
    title: "Lettere Intrecciate",
    slug: "lettere-intrecciate",
    description: "Una composizione artistica che unisce calligrafia moderna e motivi decorativi.",
    image: "https://images.pexels.com/photos/7257432/pexels-photo-7257432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    year: 2022,
    medium: "Inchiostro su carta",
    categoryId: 2,
    featured: true
  },
  {
    id: 4,
    title: "Giardino Fiorito",
    slug: "giardino-fiorito",
    description: "Una delicata composizione floreale con elementi calligrafici.",
    image: "https://images.pexels.com/photos/1070896/pexels-photo-1070896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    year: 2023,
    medium: "Acquerello su carta",
    categoryId: 2,
    featured: false
  },
  {
    id: 5,
    title: "Poesia Visiva",
    slug: "poesia-visiva",
    description: "Un'opera che unisce parole e immagini in un'elegante composizione.",
    image: "https://images.pexels.com/photos/1327688/pexels-photo-1327688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    year: 2022,
    medium: "Tecnica mista su carta",
    categoryId: 2,
    featured: false
  },
  {
    id: 6,
    title: "Armonia di Lettere",
    slug: "armonia-di-lettere",
    description: "Una composizione calligrafica con eleganti dettagli ornamentali.",
    image: "https://images.pexels.com/photos/12380159/pexels-photo-12380159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    year: 2023,
    medium: "Penna stilografica e inchiostro colorato",
    categoryId: 1,
    featured: false
  },
  {
    id: 7,
    title: "Stili Calligrafici",
    slug: "stili-calligrafici",
    description: "Una celebrazione di diversi stili calligrafici in un'unica composizione.",
    image: "https://images.pexels.com/photos/8108380/pexels-photo-8108380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    year: 2023,
    medium: "Inchiostro su carta",
    categoryId: 1,
    featured: false
  },
  {
    id: 8,
    title: "Eleganza Scritta",
    slug: "eleganza-scritta",
    description: "Un'illustrazione che celebra la bellezza della scrittura elegante.",
    image: "https://images.pexels.com/photos/7972673/pexels-photo-7972673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    year: 2022,
    medium: "Penna e acquerello",
    categoryId: 2,
    featured: false
  },
  {
    id: 9,
    title: "Design Calligrafico",
    slug: "design-calligrafico",
    description: "Un progetto di design che integra elegante calligrafia e motivi decorativi.",
    image: "https://images.pexels.com/photos/3061171/pexels-photo-3061171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    year: 2022,
    medium: "Tecnica mista",
    categoryId: 3,
    featured: false
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marco Belli",
    role: "Fan e collezionista",
    text: "Le opere di Moondy hanno una magia speciale. Il suo talento nell'uso del colore e la sua attenzione ai dettagli sono straordinari. Ogni volta che guardo le sue illustrazioni scopro nuovi elementi affascinanti.",
    stars: 5,
    approved: true
  },
  {
    id: 2,
    name: "Giulia Ferrari",
    role: "Cliente per commissione",
    text: "Collaborare con Moondy è stata un'esperienza meravigliosa. La sua capacità di interpretare le mie idee e trasformarle in arte è impressionante. Il risultato finale ha superato ogni mia aspettativa.",
    stars: 5,
    approved: true
  },
  {
    id: 3,
    name: "Alessandro Marino",
    role: "Content Creator",
    text: "Ho commissionato delle illustrazioni a Moondy per il mio progetto e sono rimasto senza parole. Non ha solo realizzato quanto richiesto, ma ha aggiunto il suo tocco unico che ha reso il tutto ancora più speciale.",
    stars: 5,
    approved: true
  }
];

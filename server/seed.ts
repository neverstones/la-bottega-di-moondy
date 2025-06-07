import { db } from './db';
import { 
  users, 
  categories, 
  artworks, 
  testimonials,
  contactMessages 
} from '@shared/schema';

/**
 * Script per inizializzare il database con dati di esempio
 */
export async function seedDatabase() {
  console.log('Inizializzazione del database con dati di esempio...');

  try {
    // Controlla se ci sono già dati nel database
    const existingCategories = await db.select().from(categories);
    if (existingCategories.length > 0) {
      console.log('Il database contiene già dei dati. Saltando la fase di inizializzazione.');
      return;
    }

    // Creare un utente admin
    const [admin] = await db.insert(users).values({
      username: 'admin',
      password: 'admin_password' // In un ambiente di produzione usare password hash
    }).returning();
    console.log('Utente admin creato con ID:', admin.id);

    // Creare categorie di opere
    const categoriesToCreate = [
      { name: 'Calligrafia', slug: 'calligrafia', description: 'Opere di calligrafia artistica' },
      { name: 'Illustrazioni', slug: 'illustrazioni', description: 'Illustrazioni artistiche' },
      { name: 'Progetti Digitali', slug: 'digitale', description: 'Progetti di arte digitale' }
    ];

    const createdCategories = await db.insert(categories).values(categoriesToCreate).returning();
    console.log('Categorie create:', createdCategories.length);

    // Mappare categorie per ID
    const categoryMap = new Map(createdCategories.map(cat => [cat.slug, cat.id]));

    // Creare opere d'arte
    const artworksToCreate = [
      {
        title: "Fantasia Viola",
        slug: "fantasia-viola",
        description: "Un'opera che esplora l'armonia delle tonalità viola e oro con elementi calligrafici.",
        image: "https://images.pexels.com/photos/691710/pexels-photo-691710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        year: 2023,
        medium: "Inchiostro e acquerello",
        categoryId: categoryMap.get('calligrafia'),
        userId: admin.id,
        featured: true
      },
      {
        title: "Calligrafia Elegante",
        slug: "calligrafia-elegante",
        description: "Una delicata composizione di calligrafia artistica con decorazioni floreali.",
        image: "https://images.pexels.com/photos/261526/pexels-photo-261526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        year: 2023,
        medium: "Penna stilografica e acquerello",
        categoryId: categoryMap.get('calligrafia'),
        userId: admin.id,
        featured: true
      },
      {
        title: "Lettere Intrecciate",
        slug: "lettere-intrecciate",
        description: "Una composizione artistica che unisce calligrafia moderna e motivi decorativi.",
        image: "https://images.pexels.com/photos/7257432/pexels-photo-7257432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        year: 2022,
        medium: "Inchiostro su carta",
        categoryId: categoryMap.get('illustrazioni'),
        userId: admin.id,
        featured: true
      },
      {
        title: "Giardino Fiorito",
        slug: "giardino-fiorito",
        description: "Una delicata composizione floreale con elementi calligrafici.",
        image: "https://images.pexels.com/photos/1070896/pexels-photo-1070896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        year: 2023,
        medium: "Acquerello su carta",
        categoryId: categoryMap.get('illustrazioni'),
        userId: admin.id,
        featured: false
      },
      {
        title: "Poesia Visiva",
        slug: "poesia-visiva",
        description: "Un'opera che unisce parole e immagini in un'elegante composizione.",
        image: "https://images.pexels.com/photos/1327688/pexels-photo-1327688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        year: 2022,
        medium: "Tecnica mista su carta",
        categoryId: categoryMap.get('illustrazioni'),
        userId: admin.id,
        featured: false
      },
      {
        title: "Armonia di Lettere",
        slug: "armonia-di-lettere",
        description: "Una composizione calligrafica con eleganti dettagli ornamentali.",
        image: "https://images.pexels.com/photos/12380159/pexels-photo-12380159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        year: 2023,
        medium: "Penna stilografica e inchiostro colorato",
        categoryId: categoryMap.get('calligrafia'),
        userId: admin.id,
        featured: false
      },
      {
        title: "Stili Calligrafici",
        slug: "stili-calligrafici",
        description: "Una celebrazione di diversi stili calligrafici in un'unica composizione.",
        image: "https://images.pexels.com/photos/8108380/pexels-photo-8108380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        year: 2023,
        medium: "Inchiostro su carta",
        categoryId: categoryMap.get('calligrafia'),
        userId: admin.id,
        featured: false
      },
      {
        title: "Eleganza Scritta",
        slug: "eleganza-scritta",
        description: "Un'illustrazione che celebra la bellezza della scrittura elegante.",
        image: "https://images.pexels.com/photos/7972673/pexels-photo-7972673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        year: 2022,
        medium: "Penna e acquerello",
        categoryId: categoryMap.get('illustrazioni'),
        userId: admin.id,
        featured: false
      },
      {
        title: "Design Calligrafico",
        slug: "design-calligrafico",
        description: "Un progetto di design che integra elegante calligrafia e motivi decorativi.",
        image: "https://images.pexels.com/photos/3061171/pexels-photo-3061171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        year: 2022,
        medium: "Tecnica mista",
        categoryId: categoryMap.get('digitale'),
        userId: admin.id,
        featured: false
      }
    ];

    const createdArtworks = await db.insert(artworks).values(artworksToCreate).returning();
    console.log('Opere d\'arte create:', createdArtworks.length);

    // Creare testimonianze
    const testimonialsToCreate = [
      {
        name: "Marco Belli",
        role: "Fan e collezionista",
        text: "Le opere di Moondy hanno una magia speciale. Il suo talento nell'uso del colore e la sua attenzione ai dettagli sono straordinari. Ogni volta che guardo le sue illustrazioni scopro nuovi elementi affascinanti.",
        stars: 5,
        approved: true
      },
      {
        name: "Giulia Ferrari",
        role: "Cliente per commissione",
        text: "Collaborare con Moondy è stata un'esperienza meravigliosa. La sua capacità di interpretare le mie idee e trasformarle in arte è impressionante. Il risultato finale ha superato ogni mia aspettativa.",
        stars: 5,
        approved: true
      },
      {
        name: "Alessandro Marino",
        role: "Content Creator",
        text: "Ho commissionato delle illustrazioni a Moondy per il mio progetto e sono rimasto senza parole. Non ha solo realizzato quanto richiesto, ma ha aggiunto il suo tocco unico che ha reso il tutto ancora più speciale.",
        stars: 5,
        approved: true
      }
    ];

    const createdTestimonials = await db.insert(testimonials).values(testimonialsToCreate).returning();
    console.log('Testimonianze create:', createdTestimonials.length);

    console.log('Database inizializzato con successo!');
  } catch (error) {
    console.error('Errore durante l\'inizializzazione del database:', error);
    throw error;
  }
}
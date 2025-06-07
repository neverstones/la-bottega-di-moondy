import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, insertCategorySchema, insertArtworkSchema, insertTestimonialSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API per i messaggi di contatto
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      
      // Store the contact message
      const message = await storage.saveContactMessage(validatedData);
      
      return res.status(200).json({ 
        success: true, 
        message: "Messaggio ricevuto con successo",
        id: message.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Si è verificato un errore durante l'invio del messaggio"
      });
    }
  });

  // API per le categorie
  app.get('/api/categories', async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getAllCategories();
      return res.status(200).json(categories);
    } catch (error) {
      console.error('Errore nel recupero delle categorie:', error);
      return res.status(500).json({ 
        success: false, 
        message: "Errore nel recupero delle categorie" 
      });
    }
  });

  app.get('/api/categories/:slug', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ 
          success: false, 
          message: "Categoria non trovata" 
        });
      }
      
      return res.status(200).json(category);
    } catch (error) {
      console.error('Errore nel recupero della categoria:', error);
      return res.status(500).json({ 
        success: false, 
        message: "Errore nel recupero della categoria" 
      });
    }
  });

  // API per le opere d'arte
  app.get('/api/artworks', async (_req: Request, res: Response) => {
    try {
      const artworks = await storage.getAllArtworks();
      return res.status(200).json(artworks);
    } catch (error) {
      console.error('Errore nel recupero delle opere:', error);
      return res.status(500).json({ 
        success: false, 
        message: "Errore nel recupero delle opere" 
      });
    }
  });

  app.get('/api/artworks/featured', async (_req: Request, res: Response) => {
    try {
      const artworks = await storage.getFeaturedArtworks();
      return res.status(200).json(artworks);
    } catch (error) {
      console.error('Errore nel recupero delle opere in evidenza:', error);
      return res.status(500).json({ 
        success: false, 
        message: "Errore nel recupero delle opere in evidenza" 
      });
    }
  });

  app.get('/api/artworks/category/:categoryId', async (req: Request, res: Response) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      
      if (isNaN(categoryId)) {
        return res.status(400).json({ 
          success: false, 
          message: "ID categoria non valido" 
        });
      }
      
      const artworks = await storage.getArtworksByCategory(categoryId);
      return res.status(200).json(artworks);
    } catch (error) {
      console.error('Errore nel recupero delle opere per categoria:', error);
      return res.status(500).json({ 
        success: false, 
        message: "Errore nel recupero delle opere per categoria" 
      });
    }
  });

  app.get('/api/artworks/:slug', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const artwork = await storage.getArtworkBySlug(slug);
      
      if (!artwork) {
        return res.status(404).json({ 
          success: false, 
          message: "Opera non trovata" 
        });
      }
      
      return res.status(200).json(artwork);
    } catch (error) {
      console.error('Errore nel recupero dell\'opera:', error);
      return res.status(500).json({ 
        success: false, 
        message: "Errore nel recupero dell'opera" 
      });
    }
  });

  // API per le testimonianze
  app.get('/api/testimonials', async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getApprovedTestimonials();
      return res.status(200).json(testimonials);
    } catch (error) {
      console.error('Errore nel recupero delle testimonianze:', error);
      return res.status(500).json({ 
        success: false, 
        message: "Errore nel recupero delle testimonianze" 
      });
    }
  });

  app.post('/api/testimonials', async (req: Request, res: Response) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      
      return res.status(201).json({ 
        success: true, 
        message: "Testimonianza inviata con successo. Sarà visibile dopo l'approvazione.", 
        id: testimonial.id 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      
      console.error('Errore nella creazione della testimonianza:', error);
      return res.status(500).json({ 
        success: false, 
        message: "Errore nell'invio della testimonianza" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

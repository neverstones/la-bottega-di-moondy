import { 
  users, 
  contactMessages,
  categories,
  artworks,
  testimonials,
  type User, 
  type InsertUser,
  type ContactMessage,
  type InsertContactMessage,
  type Category,
  type InsertCategory,
  type Artwork,
  type InsertArtwork,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Utenti
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Messaggi di contatto
  saveContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  markContactMessageAsRead(id: number): Promise<ContactMessage | undefined>;
  markContactMessageAsReplied(id: number): Promise<ContactMessage | undefined>;
  
  // Categorie
  createCategory(category: InsertCategory): Promise<Category>;
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  
  // Opere d'arte
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;
  getAllArtworks(): Promise<Artwork[]>;
  getFeaturedArtworks(): Promise<Artwork[]>;
  getArtworksByCategory(categoryId: number): Promise<Artwork[]>;
  getArtworkBySlug(slug: string): Promise<Artwork | undefined>;
  
  // Testimonianze
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getAllTestimonials(): Promise<Testimonial[]>;
  getApprovedTestimonials(): Promise<Testimonial[]>;
  approveTestimonial(id: number): Promise<Testimonial | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Utenti
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Messaggi di contatto
  async saveContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [contactMessage] = await db.insert(contactMessages).values({
      ...message,
      read: false,
      replied: false
    }).returning();
    return contactMessage;
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }
  
  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db
      .update(contactMessages)
      .set({ read: true })
      .where(eq(contactMessages.id, id))
      .returning();
    return message;
  }
  
  async markContactMessageAsReplied(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db
      .update(contactMessages)
      .set({ replied: true })
      .where(eq(contactMessages.id, id))
      .returning();
    return message;
  }
  
  // Categorie
  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }
  
  async getAllCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }
  
  // Opere d'arte
  async createArtwork(artwork: InsertArtwork): Promise<Artwork> {
    const [newArtwork] = await db.insert(artworks).values(artwork).returning();
    return newArtwork;
  }
  
  async getAllArtworks(): Promise<Artwork[]> {
    return await db.select().from(artworks).orderBy(desc(artworks.createdAt));
  }
  
  async getFeaturedArtworks(): Promise<Artwork[]> {
    return await db
      .select()
      .from(artworks)
      .where(eq(artworks.featured, true))
      .orderBy(desc(artworks.createdAt));
  }
  
  async getArtworksByCategory(categoryId: number): Promise<Artwork[]> {
    return await db
      .select()
      .from(artworks)
      .where(eq(artworks.categoryId, categoryId))
      .orderBy(desc(artworks.createdAt));
  }
  
  async getArtworkBySlug(slug: string): Promise<Artwork | undefined> {
    const [artwork] = await db.select().from(artworks).where(eq(artworks.slug, slug));
    return artwork;
  }
  
  // Testimonianze
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values({
      ...testimonial,
      approved: false
    }).returning();
    return newTestimonial;
  }
  
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }
  
  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).where(eq(testimonials.approved, true));
  }
  
  async approveTestimonial(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db
      .update(testimonials)
      .set({ approved: true })
      .where(eq(testimonials.id, id))
      .returning();
    return testimonial;
  }
}

// Esporta una nuova istanza di DatabaseStorage invece di MemStorage
export const storage = new DatabaseStorage();

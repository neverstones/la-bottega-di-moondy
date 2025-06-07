import { pgTable, text, serial, integer, boolean, timestamp, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Utenti
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Messaggi di contatto
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  read: boolean("read").default(false).notNull(),
  replied: boolean("replied").default(false).notNull(),
});

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Il nome deve contenere almeno 2 caratteri" }),
  email: z.string().email({ message: "Inserisci un indirizzo email valido" }),
  subject: z.string().min(1, { message: "Seleziona un oggetto" }),
  message: z.string().min(10, { message: "Il messaggio deve contenere almeno 10 caratteri" }),
});

export const insertContactSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type InsertContactMessage = z.infer<typeof insertContactSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Categorie di opere
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Opere d'arte
export const artworks = pgTable("artworks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  image: varchar("image", { length: 1024 }).notNull(),
  year: integer("year").notNull(),
  medium: varchar("medium", { length: 255 }),
  categoryId: integer("category_id").references(() => categories.id, { onDelete: 'set null' }),
  userId: integer("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  featured: boolean("featured").default(false).notNull(),
  dimensions: varchar("dimensions", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  metadata: json("metadata").$type<Record<string, any>>(),
});

// Testimonianze
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }),
  text: text("text").notNull(),
  stars: integer("stars").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  approved: boolean("approved").default(false).notNull(),
});

// Relazioni tra tabelle
export const usersRelations = relations(users, ({ many }) => ({
  artworks: many(artworks),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  artworks: many(artworks),
}));

export const artworksRelations = relations(artworks, ({ one }) => ({
  category: one(categories, {
    fields: [artworks.categoryId],
    references: [categories.id],
  }),
  user: one(users, {
    fields: [artworks.userId],
    references: [users.id],
  }),
}));

// Schema di inserimento per validazione
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  slug: true,
  description: true,
});

export const insertArtworkSchema = createInsertSchema(artworks).pick({
  title: true,
  slug: true,
  description: true,
  image: true,
  year: true,
  medium: true,
  categoryId: true,
  userId: true,
  featured: true,
  dimensions: true,
  metadata: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  role: true,
  text: true,
  stars: true,
});

// Tipi esportati
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertArtwork = z.infer<typeof insertArtworkSchema>;
export type Artwork = typeof artworks.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

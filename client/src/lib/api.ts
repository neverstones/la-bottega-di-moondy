import { apiRequest } from "./queryClient";
import type { Artwork, ContactMessage, InsertContactMessage, Testimonial } from "@shared/schema";

// Typi per le categorie
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

// Funzioni di fetch per le API
// Queste funzioni saranno usate come queryFn in useQuery di TanStack Query

// API per le opere d'arte
export async function fetchArtworks() {
  const response = await fetch("/api/artworks");
  if (!response.ok) {
    throw new Error("Failed to fetch artworks");
  }
  return response.json() as Promise<Artwork[]>;
}

export async function fetchFeaturedArtworks() {
  const response = await fetch("/api/artworks/featured");
  if (!response.ok) {
    throw new Error("Failed to fetch featured artworks");
  }
  return response.json() as Promise<Artwork[]>;
}

export function fetchArtworksByCategory(categoryId: number) {
  return async () => {
    const response = await fetch(`/api/artworks/category/${categoryId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch artworks by category");
    }
    return response.json() as Promise<Artwork[]>;
  };
}

export function fetchArtworkBySlug(slug: string) {
  return async () => {
    const response = await fetch(`/api/artworks/${slug}`);
    if (!response.ok) {
      throw new Error("Failed to fetch artwork");
    }
    return response.json() as Promise<Artwork>;
  };
}

// API per le testimonianze
export async function fetchTestimonials() {
  const response = await fetch("/api/testimonials");
  if (!response.ok) {
    throw new Error("Failed to fetch testimonials");
  }
  return response.json() as Promise<Testimonial[]>;
}

// API per i messaggi di contatto
export async function sendContactMessage(data: InsertContactMessage): Promise<{ success: boolean; message: string; id?: number }> {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  return response.json();
}

// API per le categorie
export async function fetchCategories() {
  const response = await fetch("/api/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json() as Promise<Category[]>;
}

export function fetchCategoryBySlug(slug: string) {
  return async () => {
    const response = await fetch(`/api/categories/${slug}`);
    if (!response.ok) {
      throw new Error("Failed to fetch category");
    }
    return response.json() as Promise<Category>;
  };
}
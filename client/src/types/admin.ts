import { Post } from '../interfaces/Post';

export interface AdminPost extends Omit<Post, 'date'> {
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  date: string; // Override date to be string for admin API
}

export interface PostFormData {
  title: string;
  slug: string;
  description: string;
  image: string;
  content: string;
  status: 'draft' | 'published';
}

export interface AuthResponse {
  authenticated: boolean;
}

export interface ImageUploadResponse {
  url: string;
}
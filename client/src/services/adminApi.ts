const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

interface LoginResponse {
  authenticated: boolean;
}

interface AuthResponse {
  authenticated: boolean;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  content: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  date: string;
}

interface PostFormData {
  title: string;
  slug: string;
  description: string;
  image: string;
  content: string;
  status: 'draft' | 'published';
}

interface ImageUploadResponse {
  url: string;
}

export const adminApi = {
  async login(password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password }),
    });
    return response.json();
  },

  async logout(): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/api/admin/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.json();
  },

  async checkAuth(): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/api/admin/status`, {
      credentials: 'include',
    });
    return response.json();
  },

  async getPosts(): Promise<Post[]> {
    const response = await fetch(`${API_BASE}/api/admin/posts`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  async getPost(id: number): Promise<Post> {
    const response = await fetch(`${API_BASE}/api/admin/posts/${id}`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  },

  async createPost(data: PostFormData): Promise<{ id: number }> {
    const response = await fetch(`${API_BASE}/api/admin/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create post');
    }
    return response.json();
  },

  async updatePost(id: number, data: Partial<PostFormData>): Promise<void> {
    const response = await fetch(`${API_BASE}/api/admin/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update post');
    }
  },

  async deletePost(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/api/admin/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete post');
  },

  async uploadImage(file: File): Promise<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE}/api/admin/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload image');
    }

    return response.json();
  },
};
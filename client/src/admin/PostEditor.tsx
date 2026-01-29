import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { adminApi } from '../services/adminApi';
import { generateSlug } from '../utils/slugify';
import type { PostFormData } from '../types/admin';
import ImageUploader from './ImageUploader';

export default function PostEditor() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    slug: '',
    description: '',
    image: '',
    content: '',
    status: 'draft',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    try {
      setIsLoading(true);
      const post = await adminApi.getPost(Number(id));
      setFormData({
        title: post.title,
        slug: post.slug,
        description: post.description || '',
        image: post.image || '',
        content: post.content,
        status: post.status,
      });
    } catch (err) {
      setError('Failed to load post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (value: string) => {
    const slug = generateSlug(value);
    setFormData({ ...formData, title: value, slug });
  };

  const handleSave = async (publish = false) => {
    setError('');
    setIsSaving(true);

    try {
      const data: PostFormData = {
        ...formData,
        status: publish ? 'published' : 'draft'
      };

      if (isEditing) {
        await adminApi.updatePost(Number(id), data);
      } else {
        const result = await adminApi.createPost(data);
        navigate(`/admin/posts/${result.id}/edit`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save post');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await adminApi.deletePost(Number(id));
      navigate('/admin/posts');
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  if (isLoading) return <div className="blog-content">Loading...</div>;

  return (
    <div className="blog-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>{isEditing ? 'Edit Post' : 'New Post'}</h1>
        <button onClick={() => navigate('/admin/posts')} style={{ padding: '0.5rem 1rem' }}>
          Back
        </button>
      </div>

      {error && <div style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</div>}

      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', fontSize: '1rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
             pattern="[a-z0-9\-]+"
             style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', fontSize: '1rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', fontSize: '1rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://example.com/image.jpg"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', fontSize: '1rem' }}
          />
        </div>

        <ImageUploader
          onUpload={(url) => setFormData({ ...formData, image: url })}
          currentImage={formData.image}
        />

        <div style={{ marginBottom: '1rem' }}>
          <label>Content</label>
          <MDEditor
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value || '' })}
            height={500}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
            style={{ padding: '0.5rem', marginTop: '0.5rem', fontSize: '1rem' }}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={isSaving}
            style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={isSaving}
            style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', backgroundColor: '#4caf50' }}
          >
            {isSaving ? 'Publishing...' : 'Publish'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', backgroundColor: '#f44336', marginLeft: 'auto' }}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
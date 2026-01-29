import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../services/adminApi';
import type { AdminPost } from '../types/admin';

export default function AdminDashboard() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const data = await adminApi.getPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await adminApi.deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      alert('Failed to delete post');
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await adminApi.logout();
    navigate('/admin/login');
  };

  if (isLoading) return <div className="blog-content">Loading...</div>;
  if (error) return <div className="blog-content">{error}</div>;

  return (
    <div className="blog-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <div>
          <button
            onClick={() => navigate('/admin/posts/new')}
            style={{ padding: '0.5rem 1rem', marginRight: '1rem' }}
          >
            New Post
          </button>
          <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>
            Logout
          </button>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333' }}>
            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Title</th>
            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Status</th>
            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Date</th>
            <th style={{ textAlign: 'right', padding: '0.75rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '0.75rem' }}>{post.title}</td>
              <td style={{ padding: '0.75rem' }}>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  backgroundColor: post.status === 'published' ? '#4caf50' : '#ff9800',
                  color: '#fff',
                }}>
                  {post.status}
                </span>
              </td>
              <td style={{ padding: '0.75rem' }}>{new Date(post.created_at).toLocaleDateString()}</td>
              <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                <button
                  onClick={() => navigate(`/admin/posts/${post.id}/edit`)}
                  style={{ padding: '0.25rem 0.5rem', marginRight: '0.5rem' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f44336', border: 'none' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {posts.length === 0 && <p style={{ textAlign: 'center', marginTop: '2rem' }}>No posts yet</p>}
    </div>
  );
}
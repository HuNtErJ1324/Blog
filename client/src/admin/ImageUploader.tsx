import { useState } from 'react';
import { adminApi } from '../services/adminApi';

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  currentImage?: string;
}

export default function ImageUploader({ onUpload, currentImage }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setIsUploading(true);

    try {
      const result = await adminApi.uploadImage(file);
      onUpload(result.url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>Or Upload Image</label>
      <div style={{ marginTop: '0.5rem' }}>
        <input
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          disabled={isUploading}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            backgroundColor: '#333',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            border: '1px solid #555',
          }}
        >
          {isUploading ? 'Uploading...' : 'Choose File'}
        </label>
        {error && <span style={{ color: '#ff6b6b', marginLeft: '1rem' }}>{error}</span>}
      </div>
      {currentImage && (
        <div style={{ marginTop: '1rem' }}>
          <p>Current image:</p>
          <img
            src={currentImage}
            alt="Preview"
            style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
}
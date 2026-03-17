import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import './CreatePost.css';
import ImageUpload from '../components/ImageUpload';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/posts', { title, content, coverImage: coverImageUrl });
            toast.success('Post created successfully!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create post');
            setLoading(false);
        }
    };

    const handleUpload = async (formData) => {
        setUploading(true);
        setUploadError(null);
        try {
            const response = await api.post('/upload', formData);
            // TODO: Orphaned upload problem - If a user selects an image and uploads it, but then 
            // selects a different one before creating the post, the old image is left orphaned on Cloudinary.
            // Future improvement: Delete the old image from Cloudinary using its public_id before uploading the new one.
            setCoverImageUrl(response.data.url);
            toast.success('Image uploaded!');
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to upload image';
            setUploadError(msg);
            toast.error(msg);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="create-post-container">
            <div className="create-post-card">
                <h1>Create New Post</h1>
                
                {/* Image Upload Component for testing file upload functionality separately */}
                <ImageUpload onUpload={handleUpload} />
                
                {uploading && <div className="loading-state" style={{ color: '#0066cc', marginTop: '10px' }}>Uploading image...</div>}
                {uploadError && <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>{uploadError}</div>}

                <hr style={{ margin: '20px 0', border: '1px solid #eee' }} />

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter post title"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your content here..."
                            rows="10"
                            required
                        ></textarea>
                    </div>
                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => navigate('/dashboard')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading || uploading}
                        >
                            {loading ? 'Creating...' : 'Create Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;

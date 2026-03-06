import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';
import api from '../services/api';

const stats = [
    { label: 'Posts Published', value: '12', icon: '📝' },
    { label: 'Total Views', value: '4,821', icon: '👁️' },
    { label: 'Followers', value: '238', icon: '👥' },
    { label: 'Drafts', value: '3', icon: '📂' },
];

const recentPosts = [
    { id: 1, title: 'My Journey into Open Source', date: 'Feb 21, 2025', views: 312, status: 'Published' },
    { id: 2, title: 'Understanding Async/Await in JS', date: 'Feb 17, 2025', views: 891, status: 'Published' },
    { id: 3, title: 'Why I Switched to TypeScript', date: 'Feb 10, 2025', views: 1203, status: 'Published' },
    { id: 4, title: 'Web Accessibility Fundamentals', date: '—', views: 0, status: 'Draft' },
];

function Dashboard() {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();
    const [usersCount, setUsersCount] = useState(0);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }

        // Sample API call to verify authenticated interceptor
        if (user) {
            const fetchUsers = async () => {
                try {
                    const response = await api.get('/users');
                    setUsersCount(response.data.length);
                } catch (error) {
                    console.error('Failed to fetch users:', error);
                }
            };
            fetchUsers();
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!user) {
        return null; // Or a redirect component
    }

    return (
        <main className="dashboard">
            <div className="dashboard-inner">
                {/* Welcome */}
                <div className="dashboard-header">
                    <div>
                        <h1>Welcome back, {user.name} 👋</h1>
                        <p className="dashboard-subtitle">Here&apos;s what&apos;s happening with your blog</p>
                    </div>
                    <div className="header-actions">
                        <Link to="#" className="btn btn-primary">+ New Post</Link>
                        <button onClick={logout} className="btn btn-outline">Logout</button>
                    </div>
                </div>

                {/* Stats */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-icon">🌟</span>
                        <span className="stat-value">{usersCount}</span>
                        <span className="stat-label">Platform Users</span>
                    </div>
                    {stats.map((stat) => (
                        <div key={stat.label} className="stat-card">
                            <span className="stat-icon">{stat.icon}</span>
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Recent Posts Table */}
                <div className="recent-section">
                    <h2 className="section-heading">Recent Posts</h2>
                    <div className="table-wrapper">
                        <table className="posts-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Views</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentPosts.map((post) => (
                                    <tr key={post.id}>
                                        <td className="post-title-cell">{post.title}</td>
                                        <td>{post.date}</td>
                                        <td>{post.views > 0 ? post.views.toLocaleString() : '—'}</td>
                                        <td>
                                            <span className={`status-badge ${post.status.toLowerCase()}`}>
                                                {post.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;

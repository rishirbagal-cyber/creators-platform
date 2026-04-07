import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';
import { toast } from 'react-toastify';
import api from '../services/api';
import LoginForm from '../components/auth/LoginForm';

function Login() {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Get the return URL from location state, or default to dashboard
    const from = location.state?.from?.pathname || '/dashboard';

    const handleLoginSubmit = async (formData) => {
        setIsLoading(true);
        try {
            // Using the new api utility instead of fetch
            const response = await api.post('/auth/login', formData);
            const data = response.data;

            // Success: Use context login function
            login(data.user, data.token);

            toast.success('Login successful! Redirecting...');
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1500);

        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Something went wrong';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <span className="auth-icon">🔑</span>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your CreatorHub account</p>
                </div>

                <LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} />

                <p className="auth-footer">
                    Don&apos;t have an account?{' '}
                    <Link to="/register">Create one free</Link>
                </p>
            </div>
        </main>
    );
}

export default Login;

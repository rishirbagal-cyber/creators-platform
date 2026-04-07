import { useState } from 'react';

const LoginForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
        // Clear error when user starts typing
        if (errors[id]) {
            setErrors((prev) => ({ ...prev, [id]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit(formData);
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit} data-testid="login-form">
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error-input' : ''}
                />
                {errors.email && <span className="error-text" role="alert">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error-input' : ''}
                />
                {errors.password && <span className="error-text" role="alert">{errors.password}</span>}
            </div>

            <div className="form-options">
                <label className="checkbox-label">
                    <input type="checkbox" /> Remember me
                </label>
                <a href="#!" className="forgot-link">Forgot password?</a>
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={isLoading}
            >
                {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
        </form>
    );
};

export default LoginForm;

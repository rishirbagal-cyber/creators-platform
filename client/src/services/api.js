import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    timeout: 10000,
});

// Request Interceptor: Attach JWT token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 errors (Unauthorized/Expired Token)
        if (error.response && error.response.status === 401) {
            console.error('Session expired or unauthorized. Logging out...');

            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Redirect to login page
            // Note: window.location.href is a simple way to redirect and force a fresh state,
            // though in a more complex React app you might use a callback or state management.
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;

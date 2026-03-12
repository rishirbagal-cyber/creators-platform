import { io } from 'socket.io-client';

// Create a centralized socket instance.
// autoConnect: false means the socket won't connect automatically —
// we manually call socket.connect() when the user is authenticated.
const socket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000', {
  autoConnect: false,
});

export default socket;

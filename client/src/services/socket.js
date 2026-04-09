import { io } from 'socket.io-client';

// Create a centralized socket instance.
// autoConnect: false means the socket won't connect automatically —
// we manually call socket.connect() when the user is authenticated.
const socket = io(import.meta.env.VITE_API_BASE_URL, {
  autoConnect: false,
  auth: {
    token: localStorage.getItem('token')
  }
});

export default socket;

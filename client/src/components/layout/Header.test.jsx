import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';
import * as AuthContext from '../../context/AuthContext';

// Mock the AuthContext hook
vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('Header Component', () => {
  
  it('renders the CreatorHub logo and home link', () => {
    // Mock user as unauthenticated
    AuthContext.useAuth.mockReturnValue({
      isAuthenticated: () => false,
      user: null,
      logout: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoText = screen.getByText(/CreatorHub/i);
    const homeLink = screen.getByRole('link', { name: /home/i });

    expect(logoText).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });

  it('shows Login and Register links when the user is NOT authenticated', () => {
    AuthContext.useAuth.mockReturnValue({
      isAuthenticated: () => false,
      user: null,
      logout: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const loginLink = screen.getByRole('link', { name: /login/i });
    const registerLink = screen.getByRole('link', { name: /register/i });

    expect(loginLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
    
    // Dashboard and Logout should NOT be present
    expect(screen.queryByText(/dashboard/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
  });

  it('shows Dashboard link and Logout button when the user IS authenticated', () => {
    AuthContext.useAuth.mockReturnValue({
      isAuthenticated: () => true,
      user: { name: 'Rishi' },
      logout: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    const welcomeMessage = screen.getByText(/hi, rishi/i);

    expect(dashboardLink).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(welcomeMessage).toBeInTheDocument();

    // Login and Register should NOT be present
    expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /register/i })).not.toBeInTheDocument();
  });

});

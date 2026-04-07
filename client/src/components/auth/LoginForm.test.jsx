import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import { describe, it, expect, vi } from 'vitest';

describe('LoginForm — interaction tests', () => {

  it('allows the user to type into the email field', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'alice@example.com');

    expect(emailInput).toHaveValue('alice@example.com');
  });

  it('allows the user to type into the password field', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);

    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, 'supersecret');

    expect(passwordInput).toHaveValue('supersecret');
  });

  it('calls onSubmit with email and password when the form is submitted', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText(/email address/i), 'alice@example.com');
    await user.type(screen.getByLabelText(/password/i), 'supersecret');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'alice@example.com',
      password: 'supersecret',
    });
  });

  it('shows an error and does not call onSubmit when fields are empty', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockSubmit} />);

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    const emailError = screen.getByText(/email is required/i);
    const passwordError = screen.getByText(/password is required/i);

    expect(emailError).toBeInTheDocument();
    expect(emailError).toHaveAttribute('role', 'alert');
    expect(passwordError).toBeInTheDocument();
    expect(passwordError).toHaveAttribute('role', 'alert');
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('shows an error when only the email is filled in', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText(/email address/i), 'alice@example.com');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    const passwordError = screen.getByText(/password is required/i);
    expect(passwordError).toBeInTheDocument();
    expect(passwordError).toHaveAttribute('role', 'alert');
    expect(mockSubmit).not.toHaveBeenCalled();
  });

});

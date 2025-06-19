import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiUrl } from '../config';
import { User, userSchema } from './use-users';

// Schema for user login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

// Schema for user registration (formerly createUserSchema)
export const registerSchema = z.object({
  email: z.string().email(),
  // username: z.string(), // Username removed as per user request
  password: z.string().min(1, "Password is required"),
});

// Type inference
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

// API Functions

/**
 * Fetches the currently authenticated user.
 * Returns null if the user is not authenticated.
 */
const fetchAuthUser = async (): Promise<User | null> => {
  try {
    const response = await fetch(`${apiUrl}/auth/me`, { // Assuming a /auth/me endpoint
      credentials: 'include',
    });

    if (response.status === 401) {
      return null; // Not authenticated
    }

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const data = await response.json();
    return userSchema.parse(data);
  } catch (error) {
    console.error("Error fetching auth user:", error);
    return null;
  }
};

/**
 * Logs in a user.
 */
const login = async (data: LoginInput): Promise<User> => {
  const validatedData = loginSchema.parse(data);
  const response = await fetch(`${apiUrl}/auth/login`, { // Assuming a /auth/login endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedData),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};

/**
 * Registers a new user.
 */
const register = async (data: RegisterInput): Promise<User> => {
  const validatedData = registerSchema.parse(data);
  const response = await fetch(`${apiUrl}/users`, { // Using existing /users endpoint for creation
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedData),
    credentials: 'include', // Add credentials include here as well
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Registration failed' }));
    throw new Error(errorData.message || 'Registration failed');
  }

  return response.json();
};

/**
 * Logs out the current user.
 */
const logout = async () => {
  const response = await fetch(`${apiUrl}/auth/logout`, { // Assuming a /auth/logout endpoint
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  return { success: true };
};


// React Query Hooks

/**
 * Hook to get the current authenticated user.
 */
export const useAuth = () => {
  return useQuery({
    queryKey: ['authUser'],
    queryFn: fetchAuthUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
  });
};

/**
 * Hook for user login.
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(['authUser'], user);
      // Invalidate any queries that might depend on the user's auth state
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

/**
 * Hook for user registration.
 */
export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      // After registration, we can treat them as logged in
      queryClient.setQueryData(['authUser'], user);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

/**
 * Hook for user logout.
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear user data and refetch auth status
      queryClient.setQueryData(['authUser'], null);
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
  });
};

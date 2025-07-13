import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiUrl } from '../config';
import { z } from 'zod';


// Matches UserRole enum in Prisma
export const UserRoleEnum = z.enum(['USER', 'ADMIN']);

// Schema for a User object, aligning with Prisma User model
export const userSchema = z.object({
  id: z.string(), // Prisma: String @id
  email: z.string().email(), // Prisma: String @unique
  username: z.string(), // Prisma: String @unique
  password: z.string().optional(), // Prisma: String? - typically not sent to client, but good for full model
  role: UserRoleEnum, // Prisma: UserRole @default(USER)
  createdAt: z.string().datetime(), // Prisma: DateTime @map("created_at")
  updatedAt: z.string().datetime(), // Prisma: DateTime @map("updated_at")
});

// Schema for updating an existing user
export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().optional(),
  password: z.string().min(1, "Password cannot be empty if provided").optional(), // Optional, but if provided, not empty
  role: UserRoleEnum.optional(),
});

// UserReview schema - NOT derived from the provided Prisma User model.
// Updating date formats for consistency. Other fields might need review
// if there's a corresponding Prisma model for Reviews.
export const userReviewSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  rating: z.number().min(1).max(5),
  createdAt: z.string().datetime(), // Updated from z.date()
  updatedAt: z.string().datetime(), // Updated from z.date()
  business: z.object({
    id: z.string().uuid(),
    name: z.string(),
    category: z.object({
      name: z.string(),
    }),
  }).optional(),
  _count: z.object({
    comments: z.number(),
    helpful_votes: z.number(),
  }).optional(),
});

// Type inference
export type User = z.infer<typeof userSchema>; // Added User type
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserReview = z.infer<typeof userReviewSchema>; // This type is based on userReviewSchema

// API functions
const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${apiUrl}/users`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchUserById = async (id: string): Promise<User> => {
  const response = await fetch(`${apiUrl}/users/${id}`, {
    credentials: 'include', // Send cookies with the request
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchCurrentUser = async (): Promise<User> => {
  console.log('Fetching current user from:', `${apiUrl}/api/users/me`);
  
  try {
    const response = await fetch(`${apiUrl}/api/users/me`, {
      credentials: 'include', // Send cookies with the request
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);
    
    if (!response.ok) {
      throw new Error(`Network response was not ok when fetching current user: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('User data received:', data);
    return data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

const updateUser = async ({ id, data }: { id: string; data: UpdateUserInput }): Promise<User> => {
  const validatedData = updateUserSchema.parse(data);
  const response = await fetch(`${apiUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedData),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// React Query hooks
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};

export const useCurrentUser = () => {
  return useQuery<User, Error>({
    queryKey: ['currentUser'] as const,
    queryFn: fetchCurrentUser,
    // You might want to add options like staleTime or gcTime (cacheTime in v4) if needed
    // e.g., staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUserById = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', data.id] });
    },
  });
};
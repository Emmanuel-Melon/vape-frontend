import { createContext, useContext, ReactNode } from 'react';
import { useCurrentUser } from '../hooks/use-users';
import type { User } from '../hooks/use-users'; // Assuming User type is exported

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading, error } = useCurrentUser();

  const isAuthenticated = !!user && !error;

  return (
    <AuthContext.Provider value={{ user: user || null, isLoading, error, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import { useCurrentUserState } from '@/stores/user.store';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSessionStorage } from 'usehooks-ts';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useSessionStorage(
    'isAuthenticated',
    false
  );

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthGuard = () => {
  const { isAuthenticated } = useAuth();
  const { currentUser } = useCurrentUserState();
  const location = useLocation();

  // Clear session storage on page reload
  useEffect(() => {
    const isAuthRoute = ['/login', '/'].includes(location.pathname);
    if (isAuthRoute) {
      sessionStorage.clear();
    }
  }, [location.pathname]);

  return isAuthenticated && currentUser?.id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthGuard;

import { useCurrentUserState } from '@/stores/user.store';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
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
  const { isAuthenticated, logout } = useAuth();
  const { currentUser } = useCurrentUserState();

  const location = useLocation();
  const navigate = useNavigate();

  const publicPaths = ['/', '/signup'];
  const isPublic = publicPaths.includes(location.pathname);

  useEffect(() => {
    if (isAuthenticated && isPublic && currentUser?.id) {
      navigate('/dashboard');
    }

    if (!isAuthenticated && !isPublic) {
      logout();
    }
  }, [location.pathname, isAuthenticated]);

  if (!isAuthenticated && !isPublic) {
    return <Navigate to="/" />;
  }

  // return isAuthenticated && currentUser?.id ? <Outlet /> : <Navigate to="/" />;
  return <Outlet />;
};

export default AuthGuard;

import useAuthStore from './store/authStore';

// Route protégée
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore((state) => ({
      isAuthenticated: state.isAuthenticated,
    }));
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

export default ProtectedRoute;
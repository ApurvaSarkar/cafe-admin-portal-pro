
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authService } from "@/services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'ADMIN' | 'EMPLOYEE';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      const role = authService.getUserRole();
      
      setIsAuthenticated(authenticated);
      setUserRole(role);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

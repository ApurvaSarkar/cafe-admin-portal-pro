
import { apiClient } from '@/lib/api';

export interface LoginRequest {
  email?: string;
  employeeId?: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email?: string;
    employeeId?: string;
    role: 'ADMIN' | 'EMPLOYEE';
  };
}

export interface User {
  id: string;
  name: string;
  email?: string;
  employeeId?: string;
  role: 'ADMIN' | 'EMPLOYEE';
}

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const endpoint = credentials.email ? '/auth/admin/login' : '/auth/employee/login';
    const response = await apiClient.post<LoginResponse>(endpoint, credentials);
    
    // Store token and user info
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('userRole', response.user.role);
    localStorage.setItem('userData', JSON.stringify(response.user));
    
    return response;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userData');
    }
  }

  getCurrentUser(): User | null {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserRole(): 'ADMIN' | 'EMPLOYEE' | null {
    return localStorage.getItem('userRole') as 'ADMIN' | 'EMPLOYEE' | null;
  }
}

export const authService = new AuthService();

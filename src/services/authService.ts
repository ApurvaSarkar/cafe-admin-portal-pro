
// Mock authentication service with hardcoded credentials

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

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@cafeflow.com',
  password: 'admin123',
  userData: {
    id: 'ADM001',
    name: 'Admin User',
    email: 'admin@cafeflow.com',
    role: 'ADMIN' as const
  }
};

// Hardcoded employee credentials
const EMPLOYEE_CREDENTIALS = [
  {
    employeeId: 'EMP001',
    password: 'emp001',
    userData: {
      id: 'EMP001',
      name: 'John Doe',
      employeeId: 'EMP001',
      role: 'EMPLOYEE' as const
    }
  },
  {
    employeeId: 'EMP002',
    password: 'emp002',
    userData: {
      id: 'EMP002',
      name: 'Jane Smith',
      employeeId: 'EMP002',
      role: 'EMPLOYEE' as const
    }
  }
];

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let user = null;
    
    // Check if admin login
    if (credentials.email) {
      if (credentials.email === ADMIN_CREDENTIALS.email && 
          credentials.password === ADMIN_CREDENTIALS.password) {
        user = ADMIN_CREDENTIALS.userData;
      }
    } 
    // Check if employee login
    else if (credentials.employeeId) {
      const employee = EMPLOYEE_CREDENTIALS.find(
        emp => emp.employeeId === credentials.employeeId && emp.password === credentials.password
      );
      if (employee) {
        user = employee.userData;
      }
    }
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Generate mock token
    const token = `mock-token-${Date.now()}`;
    
    // Store token and user info
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('userData', JSON.stringify(user));
    
    return {
      token,
      user
    };
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
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

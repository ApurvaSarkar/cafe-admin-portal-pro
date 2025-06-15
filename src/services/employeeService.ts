
import { apiClient } from '@/lib/api';

export interface Employee {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  role: string;
  joinDate: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface CreateEmployeeRequest {
  name: string;
  email: string;
  role: string;
  password: string;
}

class EmployeeService {
  async getAllEmployees(): Promise<Employee[]> {
    return apiClient.get<Employee[]>('/employees');
  }

  async createEmployee(data: CreateEmployeeRequest): Promise<Employee> {
    return apiClient.post<Employee>('/employees', data);
  }

  async updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
    return apiClient.put<Employee>(`/employees/${id}`, data);
  }

  async deleteEmployee(id: string): Promise<void> {
    return apiClient.delete(`/employees/${id}`);
  }

  async getEmployeeById(id: string): Promise<Employee> {
    return apiClient.get<Employee>(`/employees/${id}`);
  }
}

export const employeeService = new EmployeeService();

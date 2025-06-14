
import { useState } from "react";
import { Coffee, Users, Plus, LogOut, Menu, X, UserPlus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "EMP001",
      name: "John Doe",
      email: "john@cafeflow.com",
      role: "Barista",
      joinDate: "2024-01-15",
      status: 'active'
    },
    {
      id: "EMP002",
      name: "Jane Smith",
      email: "jane@cafeflow.com",
      role: "Cashier",
      joinDate: "2024-02-01",
      status: 'active'
    }
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "",
    password: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const generateEmployeeId = () => {
    const nextNum = employees.length + 1;
    return `EMP${nextNum.toString().padStart(3, '0')}`;
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    
    const employee: Employee = {
      id: generateEmployeeId(),
      name: newEmployee.name,
      email: newEmployee.email,
      role: newEmployee.role,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    setEmployees([...employees, employee]);
    
    toast({
      title: "Employee Added Successfully",
      description: `${employee.name} has been added with ID: ${employee.id}`,
    });

    setNewEmployee({ name: "", email: "", role: "", password: "" });
    setIsDialogOpen(false);
  };

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="flex items-center">
          <Coffee className="h-8 w-8 text-white mr-2" />
          <span className="text-white font-bold text-lg">CafeFlow Admin</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <nav className="mt-8 px-4">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-amber-700 bg-amber-50">
            <Users className="h-4 w-4 mr-3" />
            Employee Management
          </Button>
        </div>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full text-red-600 border-red-200 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">Employee Management</h1>
          <div className="text-sm text-gray-600">
            Welcome, Administrator
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Employees</p>
                    <p className="text-3xl font-bold text-gray-900">{employees.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Employees</p>
                    <p className="text-3xl font-bold text-green-600">
                      {employees.filter(emp => emp.status === 'active').length}
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">New This Month</p>
                    <p className="text-3xl font-bold text-blue-600">2</p>
                  </div>
                  <UserPlus className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Employee Management Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Employee List</CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Employee
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddEmployee} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        value={newEmployee.role}
                        onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                        placeholder="e.g., Barista, Cashier"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Initial Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={newEmployee.password}
                        onChange={(e) => setNewEmployee({...newEmployee, password: e.target.value})}
                        placeholder="Set initial password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Create Employee Account
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Employee ID</th>
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Join Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{employee.id}</td>
                        <td className="py-3 px-4">{employee.name}</td>
                        <td className="py-3 px-4">{employee.email}</td>
                        <td className="py-3 px-4">{employee.role}</td>
                        <td className="py-3 px-4">{employee.joinDate}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            employee.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {employee.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
